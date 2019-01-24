import { declare } from "@babel/helper-plugin-utils";
import { callExpression, memberExpression, identifier } from "@babel/types";

interface CallPath {
  node: {
    arguments: any[];
    callee: {
      object?: {
        identifier: string;
        name: string;
      };
      property?: {
        name: string;
      };
    };
  };
  replaceWith(node: any): void;
}

interface BabelAPI {
  assertVersion(version: number): void;
}

export default declare((api: BabelAPI) => {
  api.assertVersion(7);

  return {
    visitor: {
      CallExpression(path: CallPath, parent: any, scope: any) {
        if (
          !path.node.callee ||
          !path.node.callee.property ||
          !path.node.callee.object
        ) {
          return;
        }

        const replace: any = {
          smoosh: "flat",
          smooshMap: "flatMap"
        };

        if (replace[path.node.callee.property.name]) {
          path.replaceWith(
            callExpression(
              memberExpression(identifier(path.node.callee.object.name), {
                ...path.node.callee.property,
                name: replace[path.node.callee.property.name]
              }),
              path.node.arguments
            )
          );
        }
      }
    }
  };
});
