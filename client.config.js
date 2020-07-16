module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  globals: {
    window: {},
  },
}