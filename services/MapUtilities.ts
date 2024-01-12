import { ZoningType } from './Models'

export function calculateCircleRadius(zoom: number | undefined) {
  if (!zoom) {
    return 100
  }
  if (zoom <= 10) {
    return 500
  } else if (zoom <= 12) {
    return 200
  } else if (zoom <= 14) {
    return 100
  } else {
    return 50
  }
}

export function getColours(type: ZoningType | null) {
  switch (type) {
    case 'townhouse': return '#b5ffc9'
    case 'single-family residential': return '#b5ffc9'
    case 'multi-family residential': return '#39db65'
    case 'mixed use': return '#39dbc5'
    case 'commercial': return '#396fdb'
    case 'industrial': return 'orange'
    default: return 'red'
  }
}

export const defaultGoogleMapOptions: google.maps.MapOptions = {
  zoom: 10,
  center: {
    lat: 49.2827,
    lng: -123.1207
  },
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      'featureType': 'landscape',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'stylers': [
        {
          'hue': '#00aaff'
        },
        {
          'saturation': -100
        },
        {
          'gamma': 2.15
        },
        {
          'lightness': 12
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'lightness': 24
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'lightness': 57
        }
      ]
    }
  ]
}
