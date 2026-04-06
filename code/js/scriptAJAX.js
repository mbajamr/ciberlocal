

//p_container=document.querySelector("#carouselpics");
//v_pics_values;
//type= "image";
//loop= true ;
function createCarousel(p_container, v_items, options = {}) {
  //alert("createCarousel: "+ p_container);
  //if (p_items == "v_pics_values") {
  //  v_items = v_pics_values
  //}
  
  let index = 0;

  const track = p_container.querySelector(".track");
  const dotsContainer = p_container.querySelector(".dots");
  const prevBtn = p_container.querySelector(".prev");
  const nextBtn = p_container.querySelector(".next");

  // Reset content
  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  // Create slides + dots
  v_items.forEach((item, i) => {
    //alert("createCarousel item :"+ item + "  i: " + i);
    const slide = document.createElement("div");
    slide.className = "slide";

    if (options.type === "image") {
      const img = document.createElement("img");
      img.src = item;
      img.alt = "Slide " + (i + 1);
      slide.appendChild(img);
      //alert("img :"+ img);
    } else {
        // Load HTML content via fetch (your original method)
        fetch(item)
            .then(response => response.text()) // Get the HTML content as text
            .then(html => {
                //alert("html :"+ html);
                slide.innerHTML = html; // Insert the HTML content into the container
            })
            .catch(error => {
                slide.innerHTML = "Failed to load carousel content.";
                console.error("Error loading page:", error);
            });      
      
      //slide.classList.add("slide", "slide-html");
      ////slide.innerHTML = item; // HTML content
      //slide.innerHTML = `<div class="slide-content">${item}</div>`;
      ////alert("slide.innerHTML :"+ slide.innerHTML);
      ////alert(typeof item); // should be "string"
      
    }

    //alert("createCarousel slide:"+ slide);
    track.appendChild(slide);

    // Dot
    const dot = document.createElement("button");
    dot.className = "dot";

    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  // Buttons
  nextBtn.addEventListener("click", () => {
    //alert("nextBtn :"+ index);
    if (options.loop) {
      index = (index + 1) % v_items.length;
    } else {
      index = Math.min(index + 1, v_items.length - 1);
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    //alert("prevBtn :"+ index);
    if (options.loop) {
      index = (index - 1 + v_items.length) % v_items.length;
    } else {
      index = Math.max(index - 1, 0);
    }
    updateCarousel();
  });

  // Initialize
  updateCarousel();
}


function alerta(msg) {
  alert ("message!"+msg);
}

// ? DEFINE IT HERE (this was missing)
function initSection(id) {
  //console.log("Section loaded:", id);
  alert("Section loaded: "+ id);

  // Example: attach events
  const container = document.getElementById(id);

  const buttons = container.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  });
}

function getFullUrl(url) {
  const baseurl = "ciberlocal/"+url
  const fullUrl = new URL(baseurl, window.location.origin).href;
  return fullUrl
}

function loadSection(url, id) {
  const fullUrl = getFullUrl(url);

  return fetch(fullUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load " + url);
      }
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(id);
      container.innerHTML = html;
      

      if (id === "PICS") {
        //alert('loadSection sub '+id);
        //alert('loadSection html '+html);
        createCarousel(container, v_pics_values, { type: "image", loop: true });
      } else if (id === "SERVICES") {
        //alert('loadSection sub '+id);
        //alert('loadSection html '+html);
        createCarousel(container, v_services_values, { type: "html", loop: true });
        //createCarousel(container, v_pics_values, { type: "image", loop: true });
      }  else if (id === "PROMOS") {
        //alert('loadSection sub '+id);
        createCarousel(container, v_promo_values, { type: "html", loop: true });
        //createCarousel(container, v_pics_values, { type: "image", loop: true });
      } else if (id === 'SCHEDULE') {
        scheduleLogicInit();
      }
    });
}

function loadSectionOLD(url, id) {
  alert('loadSection main '+id);
  fullUrl = getFullUrl(url)
  fetch(fullUrl)
    .then(res => res.text())
    .then(html => {
      
      const container = document.getElementById(id);
      //const wrapper = document.createElement("div");
      //wrapper.innerHTML = html;
      //container.appendChild(wrapper);
      
      container.innerHTML = html;
          
      //document.getElementById(id).innerHTML = html;
      //initSection(id);
      //otherFuncAfterAJAX(id);
      //alert ("IN id "+id);
      if(id === "PICS"){
        alert('loadSection sub '+id);
        createCarousel(container, v_pics_values,{ type: "image", loop: true });
      }
    });
}

function loadTwo(url1, id1, url2, id2) {
  return loadSection(url1, id1)
    .then(() => loadSection(url2, id2))
    .catch(err => {
      console.error("Stopped because something failed:", err);
      throw err; // optional: rethrow if caller needs to know
    });
}

async function loadBoth(url1, id1, url2, id2) {
  try {
    await loadSection(url1, id1);

    if (url2 && id2) {
      await loadSection(url2, id2);
    }
  } catch (err) {
    console.error("Stopped because something failed:", err);
  }
}

async function loadBothOLD(Url1, sec1Id, Url2, sec2Id) {
  alert('loadBoth main '+sec1Id);
  
  fullUrl1 = getFullUrl(Url1)
  fullUrl2 = getFullUrl(Url2)

  try {
    const [res1, res2] = await Promise.all([
      fetch(fullUrl1),
      fetch(fullUrl2)
    ]);

    if (!res1.ok || !res2.ok) {
      throw new Error('One failed');
    }

    const [html1, html2] = await Promise.all([
      res1.text(),
      res2.text()
    ]);

    document.getElementById(sec1Id).innerHTML = html1;
    document.getElementById(sec2Id).innerHTML = html2;

  } catch (err) {
    console.log('Do not render anything');

    const el1 = document.getElementById(sec1Id);
    const el2 = document.getElementById(sec2Id);

    if (el1) el1.innerHTML = '';
    if (el2) el2.innerHTML = '';
  }
}

var xmlHttp = new Array();
var xi = new Array(0); // ARRAY OF XML-HTTP REQUEST INDEXES
xi[0] = 1; // FIRST INDEX SET TO 1 MAKING IT AVAILABLE



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
            //alert('changePage currentIndex '+currentIndex + 'direction '+direction);

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

