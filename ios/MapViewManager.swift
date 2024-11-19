//
//  MapViewManager.swift
//  WorldMap
//
//  Created by Chris  Martyr on 16/11/2024.
//

import Foundation
import MapKit
import React
import UIKit

private enum AssociatedKeys {
  static var markerId: UInt8 = 0
}

@objc(MapViewManager)
class MapViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return CustomMapView()
  }
}

class CustomMapView: UIView, MKMapViewDelegate {
  private let mapView = MKMapView()

  @objc var onMarkerPress: RCTBubblingEventBlock?

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupMapView()
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupMapView()
  }

  private func setupMapView() {
    mapView.delegate = self
    mapView.translatesAutoresizingMaskIntoConstraints = false
    addSubview(mapView)
    NSLayoutConstraint.activate([
      mapView.topAnchor.constraint(equalTo: topAnchor),
      mapView.bottomAnchor.constraint(equalTo: bottomAnchor),
      mapView.leadingAnchor.constraint(equalTo: leadingAnchor),
      mapView.trailingAnchor.constraint(equalTo: trailingAnchor),
    ])
  }

  @objc var region: NSDictionary = [:] {
    didSet {
      if let latitude = region["latitude"] as? CLLocationDegrees,
         let longitude = region["longitude"] as? CLLocationDegrees,
         let latitudeDelta = region["latitudeDelta"] as? CLLocationDegrees,
         let longitudeDelta = region["longitudeDelta"] as? CLLocationDegrees
      {
        let coordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
        let span = MKCoordinateSpan(latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta)
        let region = MKCoordinateRegion(center: coordinate, span: span)
        mapView.setRegion(region, animated: true)
      }
    }
  }

  @objc var mapType: NSString = "satellite" {
    didSet {
      switch mapType.lowercased {
      case "satellite":
        mapView.mapType = .satellite
      case "hybrid":
        mapView.mapType = .hybrid
      case "satelliteFlyover":
        mapView.mapType = .satelliteFlyover
      case "hybridFlyover":
        mapView.mapType = .hybridFlyover
      default:
        mapView.mapType = .standard
      }
    }
  }

  @objc var markers: NSArray = [] {
    didSet {
      addMarkers()
    }
  }

  // Method to add markers to the map
  private func addMarkers() {
    // Remove existing markers before adding new ones
    mapView.removeAnnotations(mapView.annotations)

    for marker in markers {
      if let markerData = marker as? [String: Any] {
        if let id = markerData["id"] as? String,
           let latitude = markerData["latitude"] as? CLLocationDegrees,
           let longitude = markerData["longitude"] as? CLLocationDegrees,
           let title = markerData["title"] as? String
        {
          let coordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
          let annotation = MKPointAnnotation()

          annotation.coordinate = coordinate
          annotation.title = title
          objc_setAssociatedObject(annotation, &AssociatedKeys.markerId, id, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)

          mapView.addAnnotation(annotation)
        }
      }
    }
  }

  func mapView(_ mapView: MKMapView, didSelect annotation: MKAnnotation) {
    if let annotation = annotation as? MKPointAnnotation {
      if let id = objc_getAssociatedObject(annotation, &AssociatedKeys.markerId) as? String {
        print("Selected marker with id: \(id)")
        onMarkerPress?(["id": id])
      }
    }
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    // Ensure that MKMapView stretches to fit the bounds of its parent UIView
    mapView.frame = bounds
  }
}
