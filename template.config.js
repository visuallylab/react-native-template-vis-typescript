module.exports = {
  // Placeholder used to rename and replace in files
  // package.json, index.json, android/, ios/
  placeholderName: "ProjectName",

  // Directory with template
  templateDir: "./template",
  postInitScript: "./postInstall.sh",

  // Placeholder title that will be replaced in values.xml and Info.plist with title provided by the user.
  // We default this value to 'Hello App Display Name', which is default placeholder in react-native template.
  titlePlaceholder: "Display Name"
}
