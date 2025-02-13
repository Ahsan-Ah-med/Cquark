 <button id="start-scanner" class="sr4-mini-search__submit sr4-btn-loading__svg"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.4 18H3.04C2.49896 18 1.98008 17.7851 1.5975 17.4025C1.21493 17.0199 1 16.501 1 15.96V14.6M14.6 18H15.96C16.501 18 17.0199 17.7851 17.4025 17.4025C17.7851 17.0199 18 16.501 18 15.96V14.6M18 4.4V3.04C18 2.49896 17.7851 1.98008 17.4025 1.5975C17.0199 1.21493 16.501 1 15.96 1H14.6M4.4 1H3.04C2.49896 1 1.98008 1.21493 1.5975 1.5975C1.21493 1.98008 1 2.49896 1 3.04V4.4M14.6 6.95V12.05M11.2 6.95V12.05M7.8 6.95V12.05M4.4 6.95V12.05" stroke="black" style="stroke:black;stroke-opacity:1;" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>

 <div class="scanner_wrapper">
    <button  class="" id="stop-scanner" aria-label="Close Search">
    <svg class="sr4-iconsvg-close" role="presentation" viewBox="0 0 16 14">
      <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>
    </svg>
    </button>
      <div id="scanner-container">
         <!-- Show the camera feed to help the user capture the barcode -->
        <div class="scan_bar_contain">
          <video autoplay>
          </video>
            <div class="scanner_bar"></div>
        </div>
         <!-- Let's simply display the barcode data and have "Waiting..." as placeholder. -->
         <p id="barcode"></p>
      </div>
    </div>
    <style>
  .scanner_wrapper {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #0006;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .scanner_wrapper.active_camera {
    display: flex;
  }
  div#scanner-container {
    max-width: 80%;
    max-height: 70vh;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    display: flex;
    /* transform: scaleX(-1); */
  }
  div#scanner-container video {
    border-radius: 20px;
    height: 100%;
    position: relative;
  }
  div#scanner-container > canvas {
    display: none;
  }
  button#stop-scanner {
    background: transparent !important;
    top: 11px;
    right: 2px;
    position: absolute;
    /* display: none; */
  }
  .scanner_bar {
    width: 100%;
    height: 2px;
    background: #0a7f01;
    position: absolute;
    box-shadow: 0 0 15px 3px #0a7f01;
   animation: scan 3s linear infinite;
  }
  .scan_bar_contain {
    display: flex;
    height: 100%;
    position: relative;
}
  
  @keyframes scan {
    0%   {top:0}
    100% {top:100%}
  }

</style>

<script>
      const startScannerButton = document.getElementById("start-scanner");
      const scannerContainer = document.getElementById("scanner-container");
      const startScannerButtonClose = document.getElementById("stop-scanner");
      // const barcodeResult = document.getElementById("barcode-result");
      let lastScannedCode = null;

      // Function to initialize and start the scanner
      function startScanner() {
        scannerContainer.style.display = "flex"; // Show the scanner container
        startScannerButtonClose.style.display = "flex"; // Show the scanner container
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: scannerContainer,
              constraints: {
                width: 600,
                height: 500,
                facingMode: "environment", // Use back camera
              },
            },
            decoder: {
              readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "upc_reader",
                "upc_e_reader",
              ],
            },
            locate: true,
            numOfWorkers: navigator.hardwareConcurrency || 4, // Use available CPU cores
            frequency: 10, // Scan frequency (higher value = slower but more accurate)
            debug: true, // Show debugging output
          },
          function (err) {
            if (err) {
              console.error("Quagga initialization failed:", err);
              scannerContainer.innerHTML = "Error initializing scanner.";
              return;
            }
            console.log("Quagga initialized successfully");
            Quagga.start();
          }
        );

        // Listen for barcode detection
        Quagga.onDetected(function (data) {
        const code = data.codeResult.code;
        if (code !== lastScannedCode) {
          lastScannedCode = code;
          // barcodeResult.textContent = code;
          console.log("Barcode detected: ", code);
      
          // Constructing a proper URL
          const baseUrl = "/search";
          const queryParams = `?q=${code}&options[prefix]=last`; // Construct query params manually
          const finalUrl = `${baseUrl}${queryParams}`; // Combine base URL and params
      
          // Navigate to the constructed URL
          window.location.href = finalUrl;
      
          Quagga.stop(); // Stop scanning after the first detection
          scannerContainer.style.display = "none"; // Hide the scanner container
          startScannerButtonClose.style.display = "none"; // Hide the scanner container
        }
      });

      }
      // Function to stop the scanner
      function stopScanner() {
        Quagga.stop(); // Stop the scanner
        scannerContainer.innerHTML = ""; // Remove all child elements
        scannerContainer.style.display = "none"; // Hide the scanner container
        startScannerButtonClose.style.display = "none"; // Hide the scanner container
        console.log("Scanner stopped");
      }

      // Start scanner on button click
      startScannerButton.addEventListener("click", startScanner);
      startScannerButtonClose.addEventListener("click", stopScanner);
  </script>
