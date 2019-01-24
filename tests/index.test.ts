import * as babel from "@babel/core";
import babelPluginSmoosh from "../src";

const options = {
  presets: [["minify", { mangle: false }]],
  plugins: [babelPluginSmoosh]
};

describe("babel-plugin-smoosh", () => {
  describe("smoosh", () => {
    it("transforms smoosh to flat", () => {
      const code = "const myArray=[1,2,[4,5]],flattened=myArray.smoosh();";
      const expected = "const myArray=[1,2,[4,5]],flattened=myArray.flat();";

      const result = babel.transformSync(code, options);
      expect(result && result.code).toBe(expected);
    });

    it("doesn’t transform custom object references", () => {
      const code =
        'const myObj={smoosh(){return"smooshed!"}},flattened=myObj.smoosh();';

      const result = babel.transformSync(code, options);
      expect(result && result.code).toBe(code);
    });
  });

  describe("smooshMap", () => {
    it("transforms smooshMap to flatMap", () => {
      const code =
        "const myArray=[1,2,[4,5]],flattened=myArray.smooshMap(x=>[2*x]);";

      const expected =
        "const myArray=[1,2,[4,5]],flattened=myArray.flatMap(x=>[2*x]);";

      const result = babel.transformSync(code, options);
      expect(result && result.code).toBe(expected);
    });

    it("doesn’t transform custom object references", () => {
      const code =
        'const myObj={smooshMap(){return"smooshed!"}},flatMapped=myObj.smooshMap();';

      const result = babel.transformSync(code, options);
      expect(result && result.code).toBe(code);
    });
  });
});
