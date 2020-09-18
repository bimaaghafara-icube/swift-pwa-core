/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/*
  NOTE: This modifies next.js internal api behavior and may break your application.
  Tested on next.js version: 9.2.1
*/

import React from 'react';
import { compact, flatten } from 'lodash';

import { NextScript } from 'next/document';

class NextScriptCustom extends NextScript {
    render() {
        const orgNextScripts = flatten(super.render().props.children);
        const scripts = compact(
            orgNextScripts.map((child) => {
                if (child) {
                    if (typeof child.props.id !== 'undefined') {
                        if (child.props.id === '__NEXT_DATA__') {
                            return {
                                props: { ...child.props },
                                content: child.props.dangerouslySetInnerHTML.__html,
                            };
                        }
                    }

                    if (child?.type === 'script') {
                        return {
                            props: { ...child.props },
                            content: '',
                        };
                    }
                }

                return null;
            }),
        );

        const initialFilterer = (props) => !props.src || !props.src.includes('chunk');
        const initialLoadScripts = scripts.filter(({ props }) => initialFilterer(props));
        const chunkedScripts = scripts.filter(({ props }) => !initialFilterer(props));

        const jsContent = `
      var chunkedScripts = ${JSON.stringify(chunkedScripts)};
      if (chunkedScripts.length === 0) {
        setTimeout(() => {
          document.body.className = document.body.className.replace("loading","");
        },500)
      }
      setTimeout(() => {
        chunkedScripts.map((script) => {
          if (!script || !script.props) return;
          try {
            var scriptTag = document.createElement('script');
  
            scriptTag.src = script.props.src;
            scriptTag.async = script.props.async;
            scriptTag.defer = script.props.defer;
            
            if (script.props.id) scriptTag.id = script.props.id;
            if (script.content) scriptTag.innerHTML = script.content;
            document.body.appendChild(scriptTag);

            setTimeout(() => {
              document.body.className = document.body.className.replace("loading","");
            },500)
          }
          catch(err) {
            console.log(err);
          }
        });
      // 1800ms seems like when PageSpeed Insights stop waiting for more js       
      }, 1400);
    `;

        return (
            <>
                {initialLoadScripts.map(({ props }, idx) => (
                    <script key={idx} {...props} src={props.src} />
                ))}

                <script id="__NEXT_SCRIPT_CUSTOM" defer dangerouslySetInnerHTML={{ __html: jsContent }} />
            </>
        );
    }
}

export default NextScriptCustom;
