/**
 * Central app branding & feature config.
 * Change this file first when creating a new app from the template.
 *
 * Also update native IDs (see README → "Create a new app"):
 *   Android applicationId  → android/app/build.gradle
 *   iOS bundle identifier  → Xcode / project.pbxproj
 */
export const appConfig = {
  appName: 'StarterApp',
  appTagline: 'Production-ready mobile starter template',
  version: '1.0.0',
  buildNumber: '1',

  /** Keep in sync with Android applicationId / iOS PRODUCT_BUNDLE_IDENTIFIER */
  packageId: 'com.starterapp',

  supportEmail: 'support@example.com',
  websiteUrl: 'https://example.com',
  privacyPolicyUrl: 'https://example.com/privacy',
  termsOfServiceUrl: 'https://example.com/terms',

  features: {
    enableSearch: true,
    enableNotifications: true,
  },
};
