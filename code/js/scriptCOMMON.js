   
  
            const htmlId = document.documentElement.id;  // `document.documentElement` refers to the <html> element
            greyColor = 'grey';

            function setPage() {
                vSavedTheme = getTheme();
                //alert('setPge vSavedTheme: '+vSavedTheme);
                setTheme(vSavedTheme);
            }

            function swichTheme(pSavedTheme) {
                if (pSavedTheme == 'dark-mode') {
                  localStorage.setItem('theme', 'light-mode');
                  document.body.classList.remove('dark-mode');
                  document.body.classList.add('light-mode');  
                } else {
                  localStorage.setItem('theme', 'dark-mode');
                  document.body.classList.remove('light-mode');
                  document.body.classList.add('dark-mode');
              }
            }

            function getTheme() {
                const getSavedTheme = localStorage.getItem('theme');
                //alert('getSavedTheme s: '+getSavedTheme);
                
                if (getSavedTheme) {
                  return getSavedTheme;
                } else {
                  return 'no-theme';
                }
            }

            function setTheme(pSavedTheme) {                
                //alert('setTheme set page: '+pSavedTheme);
                const body = document.body; 
                if (pSavedTheme=='dark-mode') {
                    //localStorage.setItem('theme', 'dark-mode');
                    document.body.style.backgroundColor = "black";
                    document.body.style.color = "white";
                    body.classList.toggle('dark-mode'); 
                    changeSVGs("white");
                    changeLINKs("cyan","lavender");
                    changeTBLs("white","white");
                    if (htmlId == "pages") {
                        changeBorderColor("white");
                    }
                    //document.body.classList.remove('light-mode');
                    //document.body.classList.add('dark-mode');
                    
                } else {
                    //localStorage.setItem('theme', 'light-mode');
                    document.body.style.backgroundColor = "white";
                    document.body.style.color = "black";
                    body.classList.toggle('light-mode');
                    changeSVGs("black");
                    changeLINKs("blue","purple");
                    changeTBLs("black","black");
                    if (htmlId == "pages") {
                        changeBorderColor("black");
                    }
                    //document.body.classList.remove('dark-mode');
                    //document.body.classList.add('light-mode');
                    
                }
            }

            function changeSVGs(pColor) {
                //alert('change svg : '+pColor);
                
                const svgs = document.querySelectorAll('svg');

                svgs.forEach((svg, index) => {
                    let svgId = svg.getAttribute('id');

                    // Get the current fill attribute
                    let currentFill = svg.getAttribute('fill');

                    // Check if the current fill is grey
                    if (currentFill !== greyColor) {
                        // If it's not grey, set the new color
                        svg.setAttribute('fill', pColor);
                    }
                });
            }

            function changeLINKs(plinkNoVisited,plinkVisited,) {

                var links = document.getElementsByTagName("a");
                for(var i=0;i<links.length;i++)
                {
                    if(links[i].href)
                    {
                        links[i].style.color = plinkNoVisited;  
                    }
                }  
               
                var links = document.getElementsByTagName("a:visited");
                for(var i=0;i<links.length;i++)
                {
                    if(links[i].href)
                    {
                        links[i].style.color = plinkVisited;  
                    }
                } 
            }

            function changeTBLs(pColorTD,pColorTH) {
                //const tbls1 = document.getElementById('schedule_table');
                //const tbls2 = document.querySelectorAll('table');
                const tbls1 = document.getElementById('tabla');
                //const tbls2 = document.getElementById('tabla2');

                if (pColorTH == "white") {
                    vcolor1 = "white";
                    vcolor2 = "black";
                }
                else
                {
                    vcolor1 = "black";
                    vcolor2 = "white";
                }

                //tbls1.style.color = pColorTH;
                 //tbls1.forEach(function(table) {
                    //tbls1.style.border = "2px solid #007BFF";
                    //tbls1.style.backgroundColor = "#f0f8ff";
                    //tbls1.style.color = "#007BFF";
                    //tbls1.querySelectorAll('td').forEach(td => {
                      //tbls1.style.backgroundColor = vcolor2;
                      //tbls1.style.border = "2px solid "+vcolor1;
                      //th.style.color = "white";
                      //tbls1.style.color = vcolor1;
                    //});
                    //tbls1.querySelectorAll('td').forEach(td => {
                    //  td.style.backgroundColor = "#e7f3ff";
                    //});
                //});
            }

            function cambiarEstilo() {
                mySavedTheme = getTheme();
                //alert('cambiar el estilo actual: '+mySavedTheme);
                swichTheme(mySavedTheme);
                mySavedTheme = getTheme();
                //alert('cambiado estilo: '+mySavedTheme);
                setTheme(mySavedTheme);

                //if (mySavedTheme=='dark-mode') {
                //    setTheme('light-mode');
                //} else {
                //    setTheme('dark-mode');
                //}
            }

            // Onload
            function otherFuncAfterAJAX(pcelda) {
                //alert('other '+pcelda);
                //cambiarEstilo();
                //if (htmlId == "pages") {
                    actualizarImagen();
                    if (pcelda=='SERVICES') {
                        //alert('SERVICES '+pcelda);
                        changePage(1,'carousel-content-services',v_services_values);
                    }
                    if (pcelda=='PROMOS') {
                        //alert('PROMOS changePage '+pcelda);
                        changePage(1,'carousel-content-promos',v_promo_values);
                    }
                    //if (pcelda=='PICS') {
                        //alert('other '+pcelda);
                        //changePage(1,'carousel-content-pics',v_pics_values);
                    //}
                    if (pcelda=='SCHEDULE') {
                        scheduleLogicInit();
                    }
                //}
                setPage();
            }            

            // Function to check if the section exists and grey out the SVG icon
            function checkSectionAndGreyOut(pcelda) {
                pceldasec = pcelda + "SEC";
                //alert("celda"+pceldasec);
                var section = document.getElementById(pceldasec); // Check for the section
                //var svgIcon = document.getElementById('knowus'); // SVG icon (button)
                //alert("sec1 "+section);
                //alert(svgIcon);

                if (!section) {
                    //alert("sec2 "+section);
                    let pceldaL = pcelda.toLowerCase();
                    const svgCelda = document.getElementById(pceldaL);
                    //alert("svgCelda:  "+svgCelda);
                    // Section not found, grey out the SVG icon
                    svgCelda.style.fill = greyColor; // Change the fill color to grey
                    //svgCelda.setAttribute('fill', 'grey';);
                    //svgIcon.style.pointerEvents = 'none'; // Optionally disable clicks
                }
            }
