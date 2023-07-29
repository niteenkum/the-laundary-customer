/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <React/RCTBridge.h>
 
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

//@import GoogleMaps;
@implementation AppDelegate

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif
  
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"thelaundrymachine"
                                            initialProperties:nil];
 [GMSServices provideAPIKey:@"AIzaSyBqljgVDb8GtH-WmAW-3FMeOfO9rocGPp0"];
   if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // reset app badge count and local notifications on first launch
 if (![[NSUserDefaults standardUserDefaults] objectForKey:@"is_first_time"])
 {
  [application cancelAllLocalNotifications];
  application.applicationIconBadgeNumber = 0;
  [[NSUserDefaults standardUserDefaults] setObject:[NSNumber numberWithBool:YES] forKey:@"is_first_time"];
 }
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
  return YES;
}
 
 //Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // Still call the JS onNotification handler so it can display the new message right away
   NSDictionary *userInfo = notification.request.content.userInfo;
  //Foreground
      NSLog(@"APP_PUSH from foreground %@", userInfo);
   [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo
                                 fetchCompletionHandler:^void (UIBackgroundFetchResult result){}];

   // allow showing foreground notifications
    completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
   // or if you wish to hide all notification while in foreground replace it with
   // completionHandler(UNNotificationPresentationOptionNone);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}



@end


// #import "AppDelegate.h"

// #import <React/RCTBridge.h>
// #import <React/RCTBundleURLProvider.h>
// #import <React/RCTRootView.h>

// #import <React/RCTAppSetupUtils.h>

// #if RCT_NEW_ARCH_ENABLED
// #import <React/CoreModulesPlugins.h>
// #import <React/RCTCxxBridgeDelegate.h>
// #import <React/RCTFabricSurfaceHostingProxyRootView.h>
// #import <React/RCTSurfacePresenter.h>
// #import <React/RCTSurfacePresenterBridgeAdapter.h>
// #import <ReactCommon/RCTTurboModuleManager.h>

// #import <react/config/ReactNativeConfig.h>

// @interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
//   RCTTurboModuleManager *_turboModuleManager;
//   RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
//   std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
//   facebook::react::ContextContainer::Shared _contextContainer;
// }
// @end
// #endif

// @implementation AppDelegate

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   RCTAppSetupPrepareApp(application);

//   RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

// #if RCT_NEW_ARCH_ENABLED
//   _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
//   _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
//   _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
//   _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
//   bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
// #endif

//   UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"thelaundrymachine", nil);

//   if (@available(iOS 13.0, *)) {
//     rootView.backgroundColor = [UIColor systemBackgroundColor];
//   } else {
//     rootView.backgroundColor = [UIColor whiteColor];
//   }

//   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//   UIViewController *rootViewController = [UIViewController new];
//   rootViewController.view = rootView;
//   self.window.rootViewController = rootViewController;
//   [self.window makeKeyAndVisible];
//   return YES;
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// #if RCT_NEW_ARCH_ENABLED

// #pragma mark - RCTCxxBridgeDelegate

// - (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
// {
//   _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
//                                                              delegate:self
//                                                             jsInvoker:bridge.jsCallInvoker];
//   return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
// }

// #pragma mark RCTTurboModuleManagerDelegate

// - (Class)getModuleClassFromName:(const char *)name
// {
//   return RCTCoreModulesClassProvider(name);
// }

// - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                       jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
// {
//   return nullptr;
// }

// - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
//                                                      initParams:
//                                                          (const facebook::react::ObjCTurboModule::InitParams &)params
// {
//   return nullptr;
// }

// - (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
// {
//   return RCTAppSetupDefaultModuleFromClass(moduleClass);
// }

// #endif

// @end
