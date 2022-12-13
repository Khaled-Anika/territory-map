import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
import List from "list.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';


mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pa2FraGFsZWQiLCJhIjoiY2xiMGx6a2htMThoeTNxcHU0bmlwYzZhbSJ9.ZO3hYO4CYqJNhkTPQXMXzA';

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

  var tempCT = [];
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
      Name: "Hessen",
      postCode: "03044"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "06108"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "06109"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "06110"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "07318"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "07319"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "07320"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "10115"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "10116"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "10117"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "17033"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "17034"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "17035"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "20038"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "20039"
    }, {
      territory: "B",
      Name: "Hessen",
      postCode: "20040"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "21217"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "21218"
    }, {
      territory: "A",
      Name: "Hessen",
      postCode: "21219"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "22844"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "22845"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "22846"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "27568"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "27569"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "27570"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "34117"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "34118"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "34119"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "54290"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "54291"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "54292"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "66041"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "66042"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "66043"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "68131"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "68132"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "68133"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "97909"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "97910"
    }, {
      territory: "X",
      Name: "Hessen",
      postCode: "97911"
    }
  ];

  const territories = ["A", "B", "X"];

  useEffect(() => {
    console.log("set main list called");
    setMainList(codesTerritory);
  }, []);

  useEffect(() => {
    let tempAreas = [];
    // const cloneCT = JSON.parse(JSON.stringify(codesTerritory));

    // eslint-disable-next-line
    selectedFeatures.map((f) => {
      // eslint-disable-next-line
      mainList.map((x) => {
        if (!x.checked) {
          let codes = f.properties.Postcodes.split(",");
          // eslint-disable-next-line
          let y = codes.find(c => c == x.postCode);
          if (y) {
            tempAreas.push({
              postCode: y,
              territory: x.territory
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
            'fill-outline-color': 'rgba(0,0,0,0.1)',
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
            'fill-outline-color': '#484896',
            'fill-color': '#DAF7A6',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Name', '']
        },
        // Place polygons under labels, roads and buildings.
        'building'
      );

      map.current.addLayer(
        {
          'id': 'counties-highlighted-2',
          'type': 'fill',
          'source': 'counties',
          'source-layer': 'Germany_divisions-cra33a',//'USA_0-dyrsfv',
          'paint': {
            'fill-outline-color': '#484896',
            'fill-color': '#DC143C',
            'fill-opacity': 0.75
          },
          'filter': ['in', 'Description', '']
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
          // 'paint': {
          //   'fill-outline-color': '#484896',
          //   'fill-color': '#DC143C',
          //   'fill-opacity': 0.75
          // },
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
          // 'paint': {
          //   'fill-outline-color': '#484896',
          //   'fill-color': '#6e599f',
          //   'fill-opacity': 0.75
          // },
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
          // 'paint': {
          //   'fill-outline-color': '#FFC300',
          //   'fill-color': '#FFC300',
          //   'fill-opacity': 0.75
          // },
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
          // 'paint': {
          //   'fill-outline-color': '#5f5f5f',
          //   'fill-color': '#5f5f5f',
          //   'fill-opacity': 0.75
          // },
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

          document.getElementById("search").value = "";
         
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
      map.current.setPaintProperty('counties-highlighted-B', 'fill-color', '#6e599f');

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

  useEffect(() => {
    if (selectedAreas && selectedAreas.length > 0) {
      var searchInputs = document.querySelectorAll('input');
      var options = {
        valueNames: ['postCode', 'territory']
      };
      var codeList = new List('myTable', options);
      console.log("codes list when list initialized", codeList);
      console.log("selected areas", selectedAreas);

      function search(e) {
        codeList.search(this.value, e.target.dataset.searchType);

        tempCT = codeList.visibleItems.map((code) => code._values);
        console.log("codes list", tempCT);
        setSearchedCodesTerritory(tempCT);
      }

      searchInputs.forEach(function (input) {
        document.getElementById("search").addEventListener('input', search)
      });
    }
  }, [selectedAreas]);

  // useEffect(() => {
  //   if (selectedAreas && selectedAreas.length > 0) {
  //     // var codeList = new List('myTable', options);
  //     // codes.update();
  //     console.log("codes on selectedAreas change", codes);
  //     codes.reIndex();
  //   }
  // }, [selectedAreas]);

  // const searchByPostcode = (e) => {
  //   if (selectedAreas && selectedAreas.length > 0) {
  //     var options = {
  //       valueNames: ['postCode', 'territory']
  //     };
  //     // var codeList = new List('myTable', options);
  //     // setCodeList(codeList);
  //     console.log("codes list when list initialized", codes);
  //     console.log("selected areas", selectedAreas);

  //     console.log("target", e.target.value);
  //     console.log("target dataset", e.target.dataset.searchType);
  //     if (e.target.value == "") {
  //       codes.reIndex();
  //     } else {
  //       codes.search(e.target.value, e.target.dataset.searchType);
  //     }

  //     tempCT = codes.visibleItems.map((code) => code._values);
  //     console.log("codes list", tempCT);
  //     setSearchedCodesTerritory(tempCT);
  //   }
  // };

  const changeTerritory = (selectedTerritory) => {
    setSelectedTerritory(selectedTerritory);
    console.log('searched codes', searchedCodesTerritory);
    const tempCT0 = searchedCodesTerritory.map(u => Object.assign({}, u));
    console.log('selected features', selectedFeatures);

    const terrAfeatures = [];
    const terrBfeatures = [];
    const terrXfeatures = [];
    const terrMixedFeatures = [];
    // eslint-disable-next-line
    if (selectedFeatures && selectedFeatures.length > 0) {
      let checkedCounter = 0;
      for (let k = 0; k < selectedFeatures.length; k++) {
        if (checkedCounter == tempCT0.length) { return; }
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
            }
          }
        });
        if (matchedCodes == f.properties.Postcodes.split(",").length) {
          console.log("all codes matched from same feature");
          console.log("selected territory", selectedTerritory);
          if (selectedTerritory === "A") {
            terrAfeatures.push(...aFeatures, f);
            setAFeatures([...aFeatures, f]);
            console.log("terr a features", terrAfeatures);

            const param1 = terrAfeatures.map((feature) => feature.properties.Name);
            map.current.setFilter('counties-highlighted-A', ['in', 'Name', ...param1]);
            map.current.setPaintProperty('counties-highlighted-A', 'fill-color', '#DC143C');
          }
          if (selectedTerritory === "B") {
            terrBfeatures.push(...bFeatures, f);
            setBFeatures([...bFeatures, f]);

            const param2 = terrBfeatures.map((feature) => feature.properties.Name);
            map.current.setFilter('counties-highlighted-B', ['in', 'Name', ...param2]);
            map.current.setPaintProperty('counties-highlighted-B', 'fill-color', '#6e599f');
          }
          if (selectedTerritory === "X") {
            terrXfeatures.push(...xFeatures, f);
            setXFeatures([...xFeatures, f]);
            console.log("terr x features after change", terrXfeatures);

            const param3 = terrXfeatures.map((feature) => feature.properties.Name);
            map.current.setFilter('counties-highlighted-X', ['in', 'Name', ...param3]);
            map.current.setPaintProperty('counties-highlighted-X', 'fill-color', '#FFC300');
          }
        } else {
          console.log("all codes DID NOT match from same feature");
          terrMixedFeatures.push(...mixedFeatures, f);
          setMixedFeatures([...mixedFeatures, f]);

          const param4 = terrMixedFeatures.map((feature) => feature.properties.Name);
          map.current.setFilter('counties-highlighted-Mixed', ['in', 'Name', ...param4]);
          map.current.setPaintProperty('counties-highlighted-Mixed', 'fill-color', '#5F5F5F');
        }
      };

      let tempCT2 = searchedCodesTerritory.map(u => Object.assign({}, u));
      let cloneCT = JSON.parse(JSON.stringify(codesTerritory));
      let count = 0;
      // let tempAreas = [];
      for (let i = 0; i < cloneCT.length; i++) {
        if (count == tempCT2.length) {
          console.log("count equals length");
          // console.log("temp areas after territory change", tempAreas);
          // setSelectedAreas(tempAreas);
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
            // tempAreas.push({
            //   postCode: tempCT2[j].postCode,
            //   territory: selectedTerritory
            // });
            break;
          }
        };
      };
      // console.log("temp areas after territory change", tempAreas);
      // setSelectedAreas(tempAreas);
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

  return (
    <div className='container d-flex flex-column'>
      <div id="map"></div>
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
          <div className='d-flex flex-row justify-content-between'>
            <input id='search' data-search-type="postCode" className="search" placeholder="Search by postCode"
            />

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

          <table id='interaction-table' className='table'>
            <thead>
              <tr>
                <th className='sortable' scope="col">Post Code</th>
                <th scope="col">Territory Name</th>
                <th>#Codes</th>
              </tr>
            </thead>
            <tbody className="list">
              {/* <tr>
                <td>1234</td>
                <td>test code</td>
              </tr> */}
              {selectedAreas.map((loc, index) => (
                <tr key={index}>
                  <td className='postCode'>{loc.postCode}</td>
                  <td className='territory'>{loc.territory}</td>
                  <td>{selectedAreas.length}</td>
                </tr>
              ))}
              <tr>
                {!selectedAreas || selectedAreas.length <= 0 && (
                  <td colSpan={2}>No areas selected yet.</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
