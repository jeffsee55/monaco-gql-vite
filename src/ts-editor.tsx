import React, { VFC, useRef, useState, useEffect } from "react";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import gqlWorker from "monaco-graphql/esm/graphql.worker?worker&inline";

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    console.log(label);
    if (label === "graphql") {
      return new gqlWorker();
    }
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
console.log(monaco.languages.typescript);

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

export const TsEditor: VFC = () => {
  const monacoEl = useRef(null);

  useEffect(() => {
    const run = async () => {
      if (monacoEl) {
        const operationModel = monaco.editor.createModel(
          `// comment
type meh = {
  meh: "ok"
}

const meh: meh = {
  meh: "ok"
}`,
          "typescript",
          monaco.Uri.file("/1/operation.ts")
        );
        monaco.editor.create(monacoEl.current!, {
          model: operationModel,
          formatOnPaste: true,
          formatOnType: true,
          folding: true,
          language: "typescript",
        });
      }
    };

    run();
  }, [monacoEl.current]);
  const style = { height: "200px", width: "100vw" };

  return (
    <>
      <div style={style} ref={monacoEl}></div>
    </>
  );
};
