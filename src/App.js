import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import List from "list.js";
import Table from "./Table";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';


mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pa2FraGFsZWQiLCJhIjoiY2xiMGx6a2htMThoeTNxcHU0bmlwYzZhbSJ9.ZO3hYO4CYqJNhkTPQXMXzA';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW5pa2FraGFsZWQiLCJhIjoiY2xiMGx6a2htMThoeTNxcHU0bmlwYzZhbSJ9.ZO3hYO4CYqJNhkTPQXMXzA';

// const TerritoryMap = ({

// }) => {
//   return (
//     <Map
//       {...viewState}
//       onMove={evt => setViewState(evt.viewState)}
//       style={{ width: 800, height: 600 }}
//       mapStyle="mapbox://styles/mapbox/streets-v12"
//       mapboxAccessToken={MAPBOX_TOKEN}
//     >
//       <Marker longitude={-122.4} latitude={37.8} color="red" />
//     </Map>
//   );
// };

function App() {
  const map = useRef(null);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [sourceFeatures, setSourceFeatures] = useState([]);
  const [tempSourceFeatures, setTempSourceFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [searchedCodesTerritory, setSearchedCodesTerritory] = useState([]);
  const [aFeatures, setAFeatures] = useState([]);
  const [bFeatures, setBFeatures] = useState([]);
  const [xFeatures, setXFeatures] = useState([]);
  const [mixedFeatures, setMixedFeatures] = useState([]);
  const [mainList, setMainList] = useState([]);
  // const [codes, setCodeList] = useState(new List('myTable', {
  //   valueNames: ['postCode', 'territory']
  // }));
  const [selectedTerr, setSelectedTerritory] = useState('');
  const [menu, setMenu] = useState(false);

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Map Territory",
        // First group columns
        columns: [
          {
            Header: "Postcode",
            accessor: "postCode"
          },
          {
            Header: "Territory",
            accessor: "territory"
          },
          {
            Header: "Name",
            accessor: "Name"
          }
        ]
      }
    ],
    []
  );

  const codesTerritory = [
    {
      territory: "A",
      Name: "Schleswig-Holstein",
      postCode: "80331"
    }, {
      territory: "A",
      Name: "Niedersachsen",
      postCode: "80332"
    }, {
      territory: "A",
      Name: "Nordrhein-Westfalen",
      postCode: "80333"
    },
    {
      territory: "B",
      Name: "Rheinland-Pfalz",
      postCode: "01067"
    }, {
      territory: "B",
      Name: "Baden-Württemberg",
      postCode: "01068"
    }, {
      territory: "B",
      Name: "Saarland",
      postCode: "01069"
    }, {
      territory: "B",
      Name: "Rheinland-Pfalz",
      postCode: "03042"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "03043"
    }, {
      territory: "B",
      Name: "Hessen1",
      postCode: "03044"
    }, {
      territory: "A",
      Name: "Hessen2",
      postCode: "06108"
    }, {
      territory: "A",
      Name: "Hessen3",
      postCode: "06109"
    }, {
      territory: "A",
      Name: "Hessen4",
      postCode: "06110"
    }, {
      territory: "A",
      Name: "Hessen5",
      postCode: "07318"
    }, {
      territory: "A",
      Name: "Hessen6",
      postCode: "07319"
    }, {
      territory: "A",
      Name: "Hessen7",
      postCode: "07320"
    }, {
      territory: "B",
      Name: "Hessen8",
      postCode: "10115"
    }, {
      territory: "B",
      Name: "Hessen9",
      postCode: "10116"
    }, {
      territory: "B",
      Name: "Hessen10",
      postCode: "10117"
    }, {
      territory: "B",
      Name: "Hessen11",
      postCode: "17033"
    }, {
      territory: "B",
      Name: "Hessen12",
      postCode: "17034"
    }, {
      territory: "B",
      Name: "Hessen13",
      postCode: "17035"
    }, {
      territory: "B",
      Name: "Hessen14",
      postCode: "20038"
    }, {
      territory: "B",
      Name: "Hessen15",
      postCode: "20039"
    }, {
      territory: "B",
      Name: "Hessen16",
      postCode: "20040"
    }, {
      territory: "A",
      Name: "Hessen17",
      postCode: "21217"
    }, {
      territory: "A",
      Name: "Hessen18",
      postCode: "21218"
    }, {
      territory: "A",
      Name: "Hessen19",
      postCode: "21219"
    }, {
      territory: "X",
      Name: "Hessen20",
      postCode: "22844"
    }, {
      territory: "X",
      Name: "Hessen40",
      postCode: "22845"
    }, {
      territory: "X",
      Name: "Hessen21",
      postCode: "22846"
    }, {
      territory: "X",
      Name: "Hessen22",
      postCode: "27568"
    }, {
      territory: "X",
      Name: "Hessen23",
      postCode: "27569"
    }, {
      territory: "X",
      Name: "Hessen24",
      postCode: "27570"
    }, {
      territory: "X",
      Name: "Hessen25",
      postCode: "34117"
    }, {
      territory: "X",
      Name: "Hessen26",
      postCode: "34118"
    }, {
      territory: "X",
      Name: "Hessen27",
      postCode: "34119"
    }, {
      territory: "X",
      Name: "Hessen28",
      postCode: "54290"
    }, {
      territory: "X",
      Name: "Hessen29",
      postCode: "54291"
    }, {
      territory: "X",
      Name: "Hessen30",
      postCode: "54292"
    }, {
      territory: "X",
      Name: "Hessen31",
      postCode: "66041"
    }, {
      territory: "X",
      Name: "Hessen32",
      postCode: "66042"
    }, {
      territory: "X",
      Name: "Hessen33",
      postCode: "66043"
    }, {
      territory: "X",
      Name: "Hessen34",
      postCode: "68131"
    }, {
      territory: "X",
      Name: "Hessen35",
      postCode: "68132"
    }, {
      territory: "X",
      Name: "Hessen36",
      postCode: "68133"
    }, {
      territory: "X",
      Name: "Hessen37",
      postCode: "97909"
    }, {
      territory: "X",
      Name: "Hessen38",
      postCode: "97910"
    }, {
      territory: "X",
      Name: "Hessen39",
      postCode: "97911"
    }
  ];

  const territories = ["A", "B", "X"];

  //for ag-grid//
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'postCode', filter: 'agTextColumnFilter' },
    { field: 'territory', filter: 'agTextColumnFilter' },
    { field: 'Name', filter: 'agTextColumnFilter' }
  ]);
  const defaultColDef = useMemo(() => ({
    floatingFilter: true,
    flex: 1,
    // filter: true,
    // filterParams: {
    //   buttons: ['apply','clear']
    // }
  }), []);

  const onFilterChanged = () => {
    console.log("updated rows in ag-grid", gridRef.current.api.getModel());
    var tmpFilteredrows = gridRef.current.api.getModel().rowsToDisplay;
    console.log("serached data", tmpFilteredrows.map(row => row.data));
    var rowsToDisplay = tmpFilteredrows.map(row => row.data);
    setSearchedCodesTerritory(rowsToDisplay);
  }

  //for ag-grid//


  useEffect(() => {
    console.log("set main list called");
    setMainList(codesTerritory);
  }, []);

  useEffect(() => {
    console.log("selected features changed");
    let tempAreas = [];
    const cloneCT = mainList.map(m => Object.assign({}, m, { checked: false })); //JSON.parse(JSON.stringify(mainList));

    // eslint-disable-next-line
    selectedFeatures.map((f) => {
      // eslint-disable-next-line
      cloneCT.map((x) => {
        if (!x.checked) {
          let codes = f.properties.Postcodes.split(",");
          // eslint-disable-next-line
          let y = codes.find(c => c == x.postCode);
          if (y) {
            tempAreas.push({
              postCode: y,
              territory: x.territory,
              Name: x.Name

            });
            x.checked = true;
          }
        }
      });
    });
    setSelectedAreas(tempAreas);
    // setTimeout(() => {
    //   codes.reIndex();
    // }, 100);
    setSearchedCodesTerritory(tempAreas);
  }, [selectedFeatures]);

  useEffect(() => {
    if (map.current) return;

    // /*global mapboxgl*/
    map.current = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', //'mapbox://styles/anikakhaled/clb1wtx0900ed15o2l0sjxhbc', 
      center: [-98, 38.88],
      minZoom: 1,
      zoom: 1
    });

    // Disable default box zooming.
    map.current.boxZoom.disable();

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: true
    });

    map.current.on('load', () => {
      const canvas = map.current.getCanvasContainer();

      // Variable to hold the starting xy coordinates
      // when `mousedown` occured.
      let start;

      // Variable to hold the current xy coordinates
      // when `mousemove` or `mouseup` occurs.
      let current;

      // Variable for the draw box element.
      let box;

      // Add a custom vector tileset source. The tileset used in
      // this example contains a feature for every county in the U.S.
      // Each county contains four properties. For example:
      // {
      //     COUNTY: "Uintah County",
      //     FIPS: 49047,
      //     median-income: 62363,
      //     population: 34576
      // }
      const url = 'mapbox://anikakhaled.bzk1h2jk';

      map.current.addSource('counties', {
        'type': 'vector',
        'url': url
      });

      map.current.addLayer(
        {
          'id': 'counties',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',
          'paint': {
            'fill-outline-color': '#000000',
            'fill-color': 'rgba(0,0,0,0.1)'
          }
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      map.current.addLayer(
        {
          'id': 'counties-highlighted',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            'fill-outline-color': '#000000',
            // 'fill-color': '#FAA0A0',
            'fill-opacity': 1.00
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      //highlight territories on initial load
      map.current.addLayer(
        {
          'id': 'counties-highlighted-A',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            'fill-outline-color': '#000000',
            //   'fill-color': '#DC143C',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      map.current.addLayer(
        {
          'id': 'counties-highlighted-B',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            'fill-outline-color': '#000000',
            //   'fill-color': '#6E599F',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      map.current.addLayer(
        {
          'id': 'counties-highlighted-X',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            'fill-outline-color': '#000000',
            //   'fill-color': '#FFC300',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      map.current.addLayer(
        {
          'id': 'counties-highlighted-Mixed',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            //   'fill-outline-color': '#5f5f5f',
            //   'fill-color': '#5f5f5f',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      // Set `true` to dispatch the event before other functions
      // call it. This is necessary for disabling the default map
      // dragging behaviour.
      canvas.addEventListener('mousedown', mouseDown, true);

      // Return the xy coordinates of the mouse position
      function mousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return new mapboxgl.Point(
          e.clientX - rect.left - canvas.clientLeft,
          e.clientY - rect.top - canvas.clientTop
        );
      }

      function mouseDown(e) {
        // Continue the rest of the function if the shiftkey is pressed.
        if (!(e.shiftKey && e.button === 0)) return;

        // Disable default drag zooming when the shift key is held down.
        map.current.dragPan.disable();

        // Call functions for the following events
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('keydown', onKeyDown);

        // Capture the first xy coordinates
        start = mousePos(e);
      }

      function onMouseMove(e) {
        // Capture the ongoing xy coordinates
        current = mousePos(e);

        // Append the box element if it doesnt exist
        if (!box) {
          box = document.createElement('div');
          box.classList.add('boxdraw');
          canvas.appendChild(box);
        }

        const minX = Math.min(start.x, current.x),
          maxX = Math.max(start.x, current.x),
          minY = Math.min(start.y, current.y),
          maxY = Math.max(start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        const pos = `translate(${minX}px, ${minY}px)`;
        box.style.transform = pos;
        box.style.width = maxX - minX + 'px';
        box.style.height = maxY - minY + 'px';
      }

      function onMouseUp(e) {
        // Capture xy coordinates
        finish([start, mousePos(e)]);
      }

      function onKeyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) finish();
      }

      function finish(bbox) {
        console.log("box", bbox);
        // Remove these events now that finish has been called.
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('mouseup', onMouseUp);

        if (box) {
          box.parentNode.removeChild(box);
          box = null;
        }

        // If bbox exists. use this value as the argument for `queryRenderedFeatures`
        if (bbox) {
          const features = map.current.queryRenderedFeatures(bbox, {
            layers: ['counties']
          });

          if (features.length >= 1000) {
            return window.alert('Select a smaller number of features');
          }
          console.log("features", features);
          setSelectedFeatures(features);

          // Run through the selected features and set a filter
          // to match features with unique FIPS codes to activate
          // the `counties-highlighted` layer.

          //highlighting areas
          const param1 = features.map((feature) => feature.properties.Name);
          map.current.setFilter('counties-highlighted', ['in', 'Name', ...param1]);

          //generating table
          // if (document.getElementById("search").value !== "") {
          //   console.log("search not empty", codes.size());
          //   // codes.search("", "postCode");
          //   codes.reIndex();
          // }

          // document.getElementById("search").value = "";

          // prepareVisualizationTable(features);
        }

        map.current.dragPan.enable();
      }

      map.current.on('mousemove', (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['counties-highlighted']
        });

        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = features.length ? 'pointer' : '';

        if (!features.length) {
          popup.remove();
          return;
        }
        popup
          .setLngLat(e.lngLat)
          .setText(features[0].properties.Name)
          .addTo(map);
      });
    });

    map.current.on('idle', function () {
      if (map.current.getSource('counties') && map.current.isSourceLoaded('counties')) {
        console.log('source loaded!');
        const tempSourceFeatures2 = map.current.querySourceFeatures("counties", {
          sourceLayer: 'Germany_divisions-cra33a'

        });
        const uniqueFeatures = [...new Map(tempSourceFeatures2.map(item =>
          [item.properties['Name'], item])).values()];
        setTempSourceFeatures(uniqueFeatures);
      }
    });

  });

  useEffect(() => {
    //highlight different territories initially
    const terrAfeatures = [];
    const terrBfeatures = [];
    const terrXfeatures = [];
    let lastCheckedTerr = '';
    const cloneCT = JSON.parse(JSON.stringify(codesTerritory));

    // eslint-disable-next-line
    if (sourceFeatures && sourceFeatures.length > 0) {
      sourceFeatures.map((f) => {
        // eslint-disable-next-line
        cloneCT.map((x) => {
          if (!x.checked) {
            let codes = f.properties.Postcodes.split(",");
            // eslint-disable-next-line
            let y = codes.find(c => c == x.postCode);
            if (y) {
              x.checked = true;
              lastCheckedTerr = x.territory;
            }
          }
        });
        if (lastCheckedTerr === "A") terrAfeatures.push(f);
        if (lastCheckedTerr === "B") terrBfeatures.push(f);
        if (lastCheckedTerr === "X") terrXfeatures.push(f);
      });

      const param1 = terrAfeatures.map((feature) => feature.properties.Name);
      map.current.setFilter('counties-highlighted-A', ['in', 'Name', ...param1]);
      map.current.setPaintProperty('counties-highlighted-A', 'fill-color', '#DC143C');

      const param2 = terrBfeatures.map((feature) => feature.properties.Name);
      map.current.setFilter('counties-highlighted-B', ['in', 'Name', ...param2]);
      map.current.setPaintProperty('counties-highlighted-B', 'fill-color', '#6E599F');

      const param3 = terrXfeatures.map((feature) => feature.properties.Name);
      map.current.setFilter('counties-highlighted-X', ['in', 'Name', ...param3]);
      map.current.setPaintProperty('counties-highlighted-X', 'fill-color', '#FFC300');

      setAFeatures(terrAfeatures);
      setBFeatures(terrBfeatures);
      setXFeatures(terrXfeatures);
    }
  }, [sourceFeatures]);

  useEffect(() => {
    if (sourceFeatures.length !== tempSourceFeatures.length) { //!equalsCheck(sourceFeatures, tempSourceFeatures)
      console.log("source & temp not equal");
      setSourceFeatures(tempSourceFeatures);
    }
  }, [tempSourceFeatures]);

  const updateLayerColors = (layerId, features, lastCheckedTerr, f, color) => {
    map.current.removeLayer(layerId);
    let index = features.findIndex(feature => feature.properties.Name == f.properties.Name);
    features.splice(index, 1);
    if (lastCheckedTerr == 'X') setXFeatures(features);
    if (lastCheckedTerr == 'A') setAFeatures(features);
    if (lastCheckedTerr == 'B') setBFeatures(features);

    console.log("SETTING X LAYER");
    map.current.addLayer(
      {
        'id': layerId,
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
        'paint': {
          'fill-outline-color': '#000000',
          'fill-color': color,
          'fill-opacity': 0.75
        },
        'filter': ['in', 'Name', ...(features.map(f => f.properties.Name))]
      },
      // Place polygons under labels, roads and buildings.
      'building'
    );
  };

  const changeTerritory = (selectedTerritory) => {
    setSelectedTerritory(selectedTerritory);
    console.log('searched codes', searchedCodesTerritory);
    const tempCT0 = searchedCodesTerritory.map(u => Object.assign({}, u));
    console.log('selected features', selectedFeatures);

    const terrAfeatures = aFeatures;
    const terrBfeatures = bFeatures;
    const terrXfeatures = xFeatures;
    const terrMixedFeatures = mixedFeatures;
    let lastCheckedTerr = '';
    // eslint-disable-next-line
    if (selectedFeatures && selectedFeatures.length > 0) {
      let checkedCounter = 0;
      for (let k = 0; k < selectedFeatures.length; k++) {
        if (checkedCounter == tempCT0.length) {
          break;
        }
        let f = selectedFeatures[k];
        let matchedCodes = 0;
        // eslint-disable-next-line
        tempCT0.map((x) => {
          if (!x.checked) {
            let codes = f.properties.Postcodes.split(",");
            // eslint-disable-next-line
            let y = codes.find(c => c == x.postCode);
            if (y) {
              x.checked = true;
              matchedCodes = matchedCodes + 1;
              checkedCounter = checkedCounter + 1;
              lastCheckedTerr = x.territory;
            }
          }
        });
        console.log("last checked territory", lastCheckedTerr);
        console.log("matched codes", matchedCodes);
        if (matchedCodes > 0) {
          if (matchedCodes == f.properties.Postcodes.split(",").length) {
            console.log("all codes matched from same feature");
            console.log("selected territory", selectedTerritory);
            if (selectedTerritory === "A") {
              terrAfeatures.push(f);
              setAFeatures(terrAfeatures);

              if (lastCheckedTerr == 'X') {
                updateLayerColors('counties-highlighted-X', xFeatures, 'X', f, '#FFC300');
              }
              if (lastCheckedTerr == 'B') {
                updateLayerColors('counties-highlighted-B', bFeatures, 'B', f, '#6E599F');
              }

              const param1 = terrAfeatures.map((feature) => feature.properties.Name);
              map.current.setFilter('counties-highlighted-A', ['in', 'Name', ...param1]);
              map.current.setPaintProperty('counties-highlighted-A', 'fill-color', '#DC143C');
              map.current.setPaintProperty('counties-highlighted-A', 'fill-opacity', 0.75);
            }
            if (selectedTerritory === "B") {
              terrBfeatures.push(f);
              setBFeatures(terrBfeatures);

              if (lastCheckedTerr == 'X') {
                updateLayerColors('counties-highlighted-X', xFeatures, 'X', f, '#FFC300');
              }
              if (lastCheckedTerr == 'A') {
                updateLayerColors('counties-highlighted-A', aFeatures, 'A', f, '#DC143C');
              }

              const param2 = terrBfeatures.map((feature) => feature.properties.Name);
              map.current.setFilter('counties-highlighted-B', ['in', 'Name', ...param2]);
              map.current.setPaintProperty('counties-highlighted-B', 'fill-color', '#6E599F');
              map.current.setPaintProperty('counties-highlighted-B', 'fill-opacity', 0.75);
            }
            if (selectedTerritory === "X") {
              terrXfeatures.push(f);
              setXFeatures(terrXfeatures);
              console.log("terr x features after change", terrXfeatures);

              if (lastCheckedTerr == 'B') {
                updateLayerColors('counties-highlighted-B', bFeatures, 'B', f, '#6E599F');
              }
              if (lastCheckedTerr == 'A') {
                updateLayerColors('counties-highlighted-A', aFeatures, 'A', f, '#DC143C');
              }

              const param3 = terrXfeatures.map((feature) => feature.properties.Name);
              map.current.setFilter('counties-highlighted-X', ['in', 'Name', ...param3]);
              map.current.setPaintProperty('counties-highlighted-X', 'fill-color', '#FFC300');
              map.current.setPaintProperty('counties-highlighted-X', 'fill-opacity', 0.75);
            }

          } else {
            console.log("all codes DID NOT match from same feature");
            terrMixedFeatures.push(f);
            setMixedFeatures(terrMixedFeatures);

            // if (lastCheckedTerr == 'X') {
            //   updateLayerColors('counties-highlighted-X', xFeatures, 'X', f, '#FFC300');
            // }
            // if (lastCheckedTerr == 'B') {
            //   updateLayerColors('counties-highlighted-B', bFeatures, 'B', f, '#6E599F');
            // }
            // if (lastCheckedTerr == 'A') {
            //   updateLayerColors('counties-highlighted-A', aFeatures, 'A', f, '#DC143C');
            // }

            const param4 = terrMixedFeatures.map((feature) => feature.properties.Name);
            map.current.setFilter('counties-highlighted-Mixed', ['in', 'Name', ...param4]);
            map.current.setPaintProperty('counties-highlighted-Mixed', 'fill-color', '#5F5F5F');
            map.current.setPaintProperty('counties-highlighted-Mixed', 'fill-opacity', 0.75);
          }
        }
      };

      let tempCT2 = searchedCodesTerritory.map(u => Object.assign({}, u));
      let cloneCT = mainList.map(m => Object.assign({}, m, { checked: false })); //JSON.parse(JSON.stringify(mainList));
      let count = 0;
      let tempAreas = [];
      for (let i = 0; i < cloneCT.length; i++) {
        if (count == tempCT2.length) {
          console.log("count equals length");
          // console.log("temp areas after territory change", tempAreas);
          setSelectedAreas(tempAreas);
          setMainList(cloneCT);
          // document.getElementById("search").value = "";
          return;
        }
        for (let j = 0; j < tempCT2.length; j++) {
          if (!tempCT2[j].checked && tempCT2[j].postCode == cloneCT[i].postCode) {
            cloneCT[i].territory = selectedTerritory;
            tempCT2[j].checked = true;
            count = count + 1;
            console.log("s checked", count, j);
            tempAreas.push({
              postCode: tempCT2[j].postCode,
              territory: selectedTerritory,
              Name: cloneCT[i].Name
            });
            break;
          }
        };
      };
      // console.log("temp areas after territory change", tempAreas);
      setSelectedAreas(tempAreas);
      setMainList(cloneCT);
      // document.getElementById("search").value = "";
    }
  }

  const equalsCheck = (a, b) => {
    // If they point to the same instance of the array
    if (a === b)
      return true;

    // If they point to the same instance of date
    if (a instanceof Date && b instanceof Date)
      return a.getTime() === b.getTime();

    // If both of them are not null and their type is not an object
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
      return a === b;

    // This means the elements are objects
    // If they are not the same type of objects
    if (a.prototype !== b.prototype)
      return false;

    // Check if both of the objects have the same number of keys
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
      return false;

    // Check recursively for every key in both
    return keys.every(k => equalsCheck(a[k], b[k]));
  };

  const sendData = (data) => {
    console.log("searched data from react table", data);
    setSearchedCodesTerritory(data);
  }

  return (
    <div className='container d-flex flex-column'>
      <div id="map"></div>

      <div className="map-overlay top">
        <div className="map-overlay-inner">
          {territories.map((terr, index) => (
            <div className='swatches d-flex justify-content-around' key={index}><div className={terr}></div>{`Territory ${terr}`}</div>
          ))}
        </div>
      </div>

      <div className='d-flex flex-row' style={{ marginTop: '17px' }}>
        {mainList && mainList.length > 0 && <div style={{ width: '50%' }}>
          <h3>Main table</h3>
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Post Code</th>
                <th scope="col">Territory Name</th>
              </tr>
            </thead>
            <tbody>
              {mainList.map((loc, index) => (
                <tr key={index}>
                  <td>{loc.postCode}</td>
                  <td>{loc.territory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        <div id="myTable" style={{ width: '50%', marginLeft: '25px' }}>
          <h3>Interaction Table</h3>
          <div className='d-flex flex-row justify-content-end'>
            {/* <input id='search' data-search-type="postCode" className="search" placeholder="Search by postCode"
            /> */}

            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className='d-inline-block'>
              <DropdownToggle caret color="primary">
                Assign To
              </DropdownToggle>
              <DropdownMenu className='language-switch dropdown-menu-end'>
                {territories.map((key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => changeTerritory(key)}
                    className={`notify-item ${selectedTerr === key ? 'active' : 'none'
                      }`}
                  >
                    <span className='align-middle'>
                      {`Territory ${key}`}
                    </span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* <Table columns={columns} data={selectedAreas} sendData={sendData} /> */}

          <div className="ag-theme-alpine" style={{ height: '100%' }}>
            <AgGridReact ref={gridRef}
              rowData={selectedAreas} animateRows={true}
              columnDefs={columnDefs} defaultColDef={defaultColDef}
              onFilterChanged={onFilterChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
