/**
 * @type {import("@proofgeist/fmdapi/dist/utils/codegen").GenerateSchemaOptions}
 */
const config = {
  schemas: [
    // add your layouts and name schemas here
    { layout: "nextauth_user", schemaName: "User" },

    // repeat as needed for each schema...
    // { layout: "my_other_layout", schemaName: "MyOtherSchema" },
  ],
  path: "./src/fmschemas",
};
module.exports = config;
