

    function createCarousel(p_container, v_items, options = {}) {
      let index = 0;

      const track = p_container.querySelector(".track");
      const dotsContainer = p_container.querySelector(".dots");
      const prevBtn = p_container.querySelector(".prev");
      const nextBtn = p_container.querySelector(".next");
      const hasMultipleItems = Array.isArray(v_items) && v_items.length > 1;

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
                    console.info("Error loading page:", error);
                });      
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

      
      //alert("hasMultipleItems 1 ");
      if (hasMultipleItems) {
      //alert("hasMultipleItems 2 "+ v_items);
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
      }
      
          // Initialize
          updateCarousel();

        if (!hasMultipleItems) {
          prevBtn.style.display = 'none';
          nextBtn.style.display = 'none';
        }

    }

    function getFullUrl(url) {
      const baseurl = "ciberlocal/"+url
      const fullUrl = new URL(baseurl, window.location.origin).href;
      return fullUrl
    }

    function loadImage(id, purl, purl2) {
      
      const img = new Image();
      const fullUrl = getFullUrl(purl);
      const fullUrl2 = getFullUrl(purl2);
      //alert('loadImage  '+id+'  fullUrl '+fullUrl+'  fullUrl2 '+fullUrl2);
      
      img.onload = () => id.src = fullUrl;
      img.onerror = () => id.src = fullUrl2;
      img.src = fullUrl;
    }

    async function loadSectionNEW(url, id) {
      const fullUrl = getFullUrl(url);

      try {
        const res = await fetch(fullUrl, { cache: "no-store" });
        const html = await res.text();

        if (!res.ok) {
          // Handle expected HTTP error here
          return {
            status: res.status,
            ok: false,
            html,
            error: `HTTP error ${res.status}`
          };
        }

        return {
          status: res.status,
          ok: res.ok,
          html
        };
      } catch (err) {
        return {
          status: 0,
          ok: false,
          html: "",
          error: err.message
        };
      }
    }

    async function loadBoth(url1, id1, url2, id2) {
      let v_sec1 = false;
      const res = await loadSectionNEW(url1, id1);
      
      
      if (res.status === 200) {
        // Insert the fetched HTML into the DOM element with id `id1`
        if (url2 && id2) {
          v_sec1 = true;
        }
        document.getElementById(id1).innerHTML = res.html;

        const container = document.getElementById(id1);
        container.innerHTML = res.html;
       
        if (id1 === "3BALLS") {
          //alert('Inserted HTML into'+ id1+ ':'+ document.getElementById(id1).innerHTML);

          const imgid = document.getElementById('circleimg1');
          //alert('loadSection 3balls '+imgid);
          if (imgid) {
            loadImage(imgid, 'MXNLSNLI0000000/img/a1_logo.jpg', 'img/white.svg');
            console.log('Image element found.');
          } else {
            console.log('Image element not found.');
          }

          const imgid2 = document.getElementById('circleimg2');
          if (imgid2) {
            loadImage(imgid2, 'MXNLSNLI0000000/img/a2_category.jpg', 'img/white.svg');
          } else {
            console.log('Image element not found.');
          }

          const imgid3 = document.getElementById('circleimg3');
          if (imgid3) {
            actualizarImagen();
          } else {
            console.log('Image element not found.');
          }      
          
        } else if (id1 === "PICS") {
            //alert('loadSection sub '+id1);
            //alert('loadSection html '+res.html);
            createCarousel(container, v_pics_values, { type: "image", loop: true });
        } else if (id1 === "SERVICES") {
            //alert('loadSection sub '+id1);
            //alert('loadSection html '+res.html);
            createCarousel(container, v_services_values, { type: "html", loop: true });
            //createCarousel(container, v_pics_values, { type: "image", loop: true });
        } else if (id1 === "PROMOS") {
            //alert('loadSection sub '+id1);
            createCarousel(container, v_promo_values, { type: "html", loop: true });
            //createCarousel(container, v_pics_values, { type: "image", loop: true });
        } else if (id1 === "SCHEDULE") {
            //alert('schedule logic js scheduleLogicInit CALL  '+id1);
            scheduleLogicInit();
        }
      } else {
          checkSectionAndGreyOut(id1);
          console.info('Failed to load section:', res.error || 'Unknown error id '+id1);
      }
      
      if (v_sec1) {
        const res2 = await loadSectionNEW(url2, id2);
          if (res2.status === 200) {
            // Insert the fetched HTML into the DOM element with id `id1`
            document.getElementById(id2).innerHTML = res2.html;
          } else {
            console.info('Failed to load section:', res2.error || 'Unknown error id '+id1);
          }
      }
      return null;
    }

