# Commands
npx react-native init MyApp
cd MyApp

npm install appcenter appcenter-analytics appcenter-crashes --save-exact

# Create a new file with the filename appcenter-config.json in android/app/src/main/assets/ with the following content:
{
  "app_secret": "UUID" 
}

# Modify the app's res/values/strings.xml to include the following lines:

<string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
<string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>

# Set Variables to Build on MAC:
cat << EOF >> .zshrc
export JAVA_HOME=$(/usr/libexec/java_home)
export JAVA_HOME_8_X64=$(/usr/libexec/java_home)
export WA_API_VERSION=2.31.4
export ANDROID_HOME=/Users/alexandreteixeira/Library/Android/sdk/
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
EOF

git init
git remote add origin <YOUR_AZURE_DEVOPS_REPO_URL>
git push -u origin --all

yarn android or yarn start

# Change this file:
android/build.gradle
buildscript {
+
+    def getMyVersionCode = { ->
+        def code = project.hasProperty('versionCode') ? versionCode.toInteger() : 1
+        println "VersionCode is set to $code"
+        return code
+    }
+
+    def getMyVersionName = { ->
+        def name = project.hasProperty('versionName') ? versionName : "1.0"
+        println "VersionName is set to $name"
+        return name
+    }
     ext {...

# Next, add the following changes:
android/app/build.gradle
android {
         applicationId "com.myproject"
         minSdkVersion rootProject.ext.minSdkVersion
         targetSdkVersion rootProject.ext.targetSdkVersion
-        versionCode 1
-        versionName "1.0"
+        versionCode rootProject.ext.versionCode
+        versionName rootProject.ext.versionName
     }
     splits {...


# Generating an upload key to Azure Libraries
# https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key
# Sample values for: CN=Ale Pena, OU=DEV, O=OEM, L=Lins, ST=SP, C=BR

mkdir keys
cd keys
keytool -genkey -v -keystore my-app-upload-key.keystore -alias my-app-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Upload the file to Azure File Secure and Create variables
my-app-upload-key.keystore

AndroidKeyAlias: my-app-key-alias
AndroidKeyAliasPassword: ********
AndroidKeyStorePassword: ********

And other to iOS.


# To Keycloak Configuration
Start the keycloak and create one realm clientes and clientId users;

