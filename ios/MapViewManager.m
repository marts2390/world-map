//
//  MapViewManager.m
//  WorldMap
//
//  Created by Chris  Martyr on 16/11/2024.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MapViewManager, RCTViewManager)

// Exporting the properties for React Native
RCT_EXPORT_VIEW_PROPERTY(region, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(style, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(mapType, NSString)
RCT_EXPORT_VIEW_PROPERTY(markers, NSArray)

// Exposing the onMarkerPress method to React Native
RCT_EXPORT_VIEW_PROPERTY(onMarkerPress, RCTBubblingEventBlock)

@end
