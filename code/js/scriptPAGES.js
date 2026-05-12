
    function changeBorderColor(pBorderColor,pcbimg) {
      //alert('change border : '+pBorderColor + '   pcbimg ' + pcbimg);
      const cbimg = document.getElementById(pcbimg);
      //const imgFill = pcbimg.style.border;
      //const imgFill = document.getStyle(cbimg).border;
      //const imgFill = document.getElementById(cbimg);
      //const imgFill = cbimg.getAttribute("style"); 
      const imgFill = cbimg.style.border
      

      // Check if the current fill is grey
      //if (imgFill !== "13px solid grey" ) {
      //  alert('imgFill : '+imgFill );
      //}
      // If it's not grey, set the new color
        
      if (cbimg != null && imgFill !== "13px solid grey") {
        cbimg.style.border = "13px solid " + pBorderColor ;
      }
    }

    // Open close based on table
    function actualizarImagen() {
        const imagenstatus = document.getElementById('circleimg3');
        const varEstadoNegocio = obtenerEstadoNegocio();
        const cbimg3 = document.getElementById('circleimg3');

        if (varEstadoNegocio=='green') {
            imagenstatus.style.backgroundColor = 'green';
            cbimg3.innerText  =  'ABIERTO';
        } else {
            //imagenstatus.style.backgroundColor = varEstadoNegocio;
            //imagenstatus.style.backgroundColor = '#ffcccb';
            if (imagenstatus != null) {
                imagenstatus.style.backgroundColor = 'darkred';
            }
            if (cbimg3 != null) {
                cbimg3.innerText  =  'CERRADO';
            }
            
        }            
    }
    
    function obtenerEstadoNegocio() {
        // Obtiene la fecha y hora actual
        const fechaActual = new Date();
        const diaActual = fechaActual.getDay(); // day mumber (sunday 0 , monday 1, etc.)
        const horaActual = fechaActual.getHours(); // Hora actual (0-23)
        const status = getCellStatus(diaActual, horaActual+'00');
        return (status=='open') ? "green" : "red";
    }

    function getCellStatus(day, time) {

        // Get all the rows of the table body
        const rows = document.querySelectorAll('#schedule_table tr');

        // Loop through each row to find the right time
        for (let row of rows) {
            const cell = row.cells[day+1]; // Get the cell for the specified day (column)
            const cellContent = cell.textContent;
            const isOpen = cell.classList.contains('open'); // Check if the cell has class 'open'
            //console.log('isOpen:'+ isOpen)
            if (cellContent === time) {
                // Check if the cell has the 'open' class
                if (isOpen) {
                    return 'open';  // Return 'open' if the class is present
                } else {
                    return 'false';  // Return 'false' if the class is present
                }
                
            }
        }
        // If no matching time was found
        return 'false';  // Return 'false' if the class is not present
    }

    function handleClick(url) {
        if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('http') || url.startsWith('../')) {
          //window.location.href = url;  // Open the URL, email client, or phone dialer
          window.open(url, '_blank');
        } else {
          alert("Invalid URL"+url);
        }
    }

    function scrollToTop() {
        window.scrollTo({ top:0, behavior:'smooth' });
        //scrollToSection('topo');
    }

    function goToParentIndex() {
        // Navegar un nivel hacia arriba y abrir index.html
        window.location.href = "search.html";
    }

    function openPopup(page) {

        fetch(page)
        .then(response => response.text())
        .then(html => {

        document.getElementById("modal-content").innerHTML = html;

        document.getElementById("popupModal").classList.add("is-active");

        });

    }

    function closeModal(){

        document.getElementById("popupModal").classList.remove("is-active");

    }

    // Function to check if the section exists and grey out the SVG icon
    function checkSectionAndGreyOut(pcelda) {
      try {
        pceldasec = pcelda + "SEC";
        let pceldaL = pcelda.toLowerCase();
        //alert("celda"+pceldasec);
        var section = document.getElementById(pceldasec); // Check for the section
        //var svgIcon = document.getElementById('knowus'); // SVG icon (button)
        //alert("sec1 "+section);
        //alert(svgIcon);

        if (!section) {
            //alert("sec2 "+section);
            
            const svgCelda = document.getElementById(pceldaL);
            //alert("svgCelda:  "+pceldaL);
            // Section not found, grey out the SVG icon
            svgCelda.style.fill = greyColor; // Change the fill color to grey

            //svgCelda.setAttribute('fill', 'grey';);
            //svgIcon.style.pointerEvents = 'none'; // Optionally disable clicks
        }
        if (pceldaL = 'knowus') {
            changeBorderColor("grey","circleimg1");
        } else if (pceldaL = 'service') {
            changeBorderColor("grey","circleimg2");
        } else if (pceldaL = 'schedule') {
            changeBorderColor("grey","circleimg3");
        }
      } catch (err) {
        console.info("Stopped with error:", err);
      }
    }
