
var xmlHttp = new Array();
var xi = new Array(0); // ARRAY OF XML-HTTP REQUEST INDEXES
xi[0] = 1; // FIRST INDEX SET TO 1 MAKING IT AVAILABLE

function showData(url, celda, runExtraJS = null){ 
return new Promise(function(resolve, reject) {  // Returning a Promise
var xmlHttpIndex = xi.length;
var myClass;

for (var i=0; i<xi.length; i++) {
  if (xi[i] == 1) {
    xi[i] = 0;
    xmlHttpIndex = i;
    break;
  }
}

xi[xmlHttpIndex] = 0;

xmlHttp[xmlHttpIndex]=GetXmlHttpObject();
if (xmlHttp[xmlHttpIndex]==null){
  alert ("Your browser does not support AJAX!");
  return;
} 
xmlHttp[xmlHttpIndex].onreadystatechange=function(){
  
  if (xmlHttp[xmlHttpIndex].readyState==4){ 
    if (xmlHttp[xmlHttpIndex].status == 200) {
      document.getElementById(celda).innerHTML=xmlHttp[xmlHttpIndex].responseText;
      document.getElementById(celda).className=myClass;
      otherFuncAfterAJAX(celda);
      xi[xmlHttpIndex] = 1;
      // Call the callback function with a success value
      resolve("Request successful");
    } else {
      //alert("Ha habido un problema con la URL:"+url);
      // Call the callback function with a failure value
      reject("Request failed");
      return;
    }
    xmlHttp[xmlHttpIndex] = null;
  }
}

xmlHttp[xmlHttpIndex].open("GET",url,true);

xmlHttp[xmlHttpIndex].send(null);
});
}

function show2Secs(url1,celda1,url2,celda2,runExtraJS = null){ 
    showData(url1,celda1,runExtraJS)
    .then(function(result) {
        //console.log(result); // "Request successful"
        showData(url2,celda2,runExtraJS);
    })

    .catch(function(error) {
        console.log(error); // "Request failed" or "AJAX not supported"
        checkSectionAndGreyOut(celda1);
    });
}

function noTexto(thefield)
    {  
      if (event.keyCode < 46 || event.keyCode > 57 || event.keyCode == 47  ) 
      {
     //alert("Solo se permiten valores numericos para este campo");
          event.returnValue = false;
      }
    } 

function noTextoCopyPaste(thefield)
    {  
      if (event.keyCode < 46 || event.keyCode > 57 || event.keyCode == 47  ) 
      {
     alert("Solo se permiten valores numericos para este campo");
          event.returnValue = false;
      }
    } 

function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}

      function hide() {
         document.getElementById('AWS').style.visibility = 'hidden';
      }
      function show() {
         document.getElementById('AWS').style.visibility = 'visible';
      }

        let currentIndex = 0;

        // Function to change the HTML page based on direction (-1 for previous, 1 for next)
        function changePage(direction, p_id, pValues) {
            // Update the current index based on the direction
            currentIndex += direction;

            // Loop through the pages array, ensure it stays within bounds (circular carousel)
            if (currentIndex < 0) {
                currentIndex = pValues.length - 1;
            } else if (currentIndex >= pValues.length) {
                currentIndex = 0;
            }

            // Make an AJAX call to fetch the page (simulated here by loading HTML content)
            loadContent(p_id,pValues[currentIndex]);
        }

        // Function to load the HTML page via AJAX and update the content
        function loadPage(p_id, pagePath) {
            const contentElement = document.getElementById(p_id);

            // Simulate AJAX by using fetch to load the page
            fetch(pagePath)
                .then(response => response.text())
                .then(html => {
                    contentElement.innerHTML = html;
                })
                .catch(error => {
                    contentElement.innerHTML = "Failed to load page.";
                    console.error("Error loading page:", error);
                });
        }

// Function to load content dynamically based on the file extension (HTML or Image)
function loadContent(p_id, pagePath) {
    const contentElement = document.getElementById(p_id);

    // Check if the pagePath is an HTML file or an image file based on its extension
    const fileExtension = pagePath.split('.').pop().toLowerCase();
    
    // Determine how to handle the content based on the file extension
    if (fileExtension === 'html') {
        // Load HTML content via fetch (your original method)
        fetch(pagePath)
            .then(response => response.text()) // Get the HTML content as text
            .then(html => {
                contentElement.innerHTML = html; // Insert the HTML content into the container
            })
            .catch(error => {
                contentElement.innerHTML = "Failed to load page.";
                console.error("Error loading page:", error);
            });
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        // Load image content dynamically
        fetch(pagePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Image not found.");
                }
                return response.blob(); // Get the image content as a blob
            })
            .then(imageBlob => {
                const imageURL = URL.createObjectURL(imageBlob); // Create a URL for the image blob
                const imgElement = document.createElement("img"); // Create an <img> element
                imgElement.src = imageURL; // Set the image source
                contentElement.innerHTML = ""; // Clear previous content
                contentElement.appendChild(imgElement); // Add the image to the container
            })
            .catch(error => {
                contentElement.innerHTML = "Failed to load image.";
                console.error("Error loading image:", error);
            });
    } else {
        // Handle unsupported file types
        contentElement.innerHTML = "Unsupported file type.";
    }
}

