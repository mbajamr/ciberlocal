

    // Helper function to check if the script exists before appending
    function scriptExists(url) {
      return fetch(url, { method: 'HEAD' })
        .then(response => response.ok)  // If the response is 200, it means the script exists
        .catch(() => false);  // If fetch fails, the script doesn't exist
    }

    function loadScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";

        script.onload = () => resolve(url);
        script.onerror = () => reject(`Failed to load script: ${url}`);

        document.head.appendChild(script);
      });
    }

    let v_schedule_logic = false;
    async function loadAll(pFolder) {
        const paramCAROUSEL = pFolder+'/code/js/scriptCAROUSEL.js';
        const paramOPENHOURS = pFolder+'/code/js/open_hours.js';
        

        const codes = ["code/js/scriptCOMMON.js", "code/js/scriptPAGES.js", "code/js/schedule_logic.js", paramOPENHOURS, paramCAROUSEL, "code/js/scriptAJAX.js"]; 


        // Use reduce to load scripts sequentially and call respective functions
        codes.reduce((promise, code) => {
            return promise.then(() => {
                const scriptUrl = `${code}`;

                return scriptExists(scriptUrl)  // Check if the script exists
                .then((exists) => {
                    if (exists) {
                        return loadScript(`${code}`).then(() => {
                            console.log(`Script from ${code} loaded!`);

                            // Call the respective function based on the code
                            if (code === paramOPENHOURS) {
                                v_schedule_logic = true;
                            }
                            if (code === "code/js/scriptAJAX.js") {

                                //alert('loadAll start');
                                const sections = [
                                { url: 'secs/HEADER.html', id: 'HEADER' },
                                { url: 'secs/FOOTER.html', id: 'FOOTER' },
                                { url: pFolder+'/sec/TITLE.html', id: 'TITLE' },
                                { url: pFolder+'/sec/CATEGORY.html', id: 'CATEGORY' },
                                { url: pFolder+'/sec/3BALLS.html', id: '3BALLS' },
                                { url: pFolder+'/sec/ICONS.html', id: 'ICONS' },
                                { url: 'secs/SEPARATOR.html', id: 'SEPARATOR' },
                                { url: 'secs/SERVICES.html', id: 'SERVICES', url2: 'hdr/SERVICES.html', id2: 'SERVICESHDR' },
                                { url: 'secs/PICS.html', id: 'PICS', url2: 'hdr/PICS.html', id2: 'PICSHDR' },
                                { url: 'secs/PROMOS.html', id: 'PROMOS', url2: 'hdr/PROMOS.html', id2: 'PROMOSHDR' },
                                { url: 'secs/OWNER.html', id: 'OWNER', url2: 'hdr/OWNER.html', id2: 'OWNERHDR' },
                                { url: pFolder+'/sec/KNOWUS.html', id: 'KNOWUS', url2: 'hdr/KNOWUS.html', id2: 'KNOWUSHDR' },
                                { url: pFolder+'/sec/CONTACT.html', id: 'CONTACT', url2: 'hdr/CONTACT.html', id2: 'CONTACTHDR' },
                                { url: pFolder+'/maps/LOCATION.html', id: 'LOCATION', url2: 'hdr/LOCATION.html', id2: 'LOCATIONHDR' },
                                { url: pFolder+'/sec/SHARE.html', id: 'SHARE', url2: 'hdr/SHARE.html', id2: 'SHAREHDR' }
                                ];

                                if (v_schedule_logic) {
                                    sections.push({ url: pFolder+'/sec/SCHEDULE.html', id: 'SCHEDULE', url2: 'hdr/SCHEDULE.html', id2: 'SCHEDULEHDR' });
                                } 
                                //else {
                                //    checkSectionAndGreyOut('SCHEDULE');
                                //    console.info("No schedule section ");  // Handle any loading errors
                                //
                                //}

                                const results = [];
                                for (const section of sections) {
                                    //alert('loadAll section id '+section.id+'  url '+section.url);
                                    //if (!section.id2) {
                                        ////let resBoth = await loadBoth(section.url,section.id,section.url2,section.id2);
                                        loadBoth(section.url,section.id,section.url2,section.id2);
                                        
                                        //promises.push(loadBoth(section.url,section.id,section.url2,section.id2));
                                        //const results = await middleFunc(list);
                                        // IMPORTANT: await inside loop if you want sequential behavior
                                        //const result = await loadBoth(section.url,section.id,section.url2,section.id2);
                                        //results.push(result);
                                        //await loadBoth(section.url,section.id,section.url2,section.id2);
                                    //} else {
                                        //const result = await loadSection(section.url,section.id);
                                        //await loadSection(section.url,section.id);
                                    //    loadBoth(section.url,section.id,section.url2,section.id2);
                                        //.then(res => {alert('sts '+res.status+' id '+section.id+'  html'); });
                                        //alert('loadAll step 2 id '+section.id+'  url '+section.url);
                                        //results.push(result);
                                        //alert('loadAll step 3 id '+section.id+'  url '+section.url);
                                    //}
                                }
                                
                                //const promRes = await Promise.all(promises);
                                //const promises = sections.map(section => loadBoth((section.url,section.id,section.url2,section.id2));
                                //const results = await Promise.all(promises);
                                //await Promise.all(promises);
                                //return await Promise.all(promises);
                                //const results = await middleFunc(list);
                                
                                // Runs after ALL async operations finish
                                //doSomethingAfter(results);

                                if (!v_schedule_logic) {
                                    checkSectionAndGreyOut('SCHEDULE');
                                    console.info("No schedule section ");  // Handle any loading errors
                                }

                                
                            }
                        });
                    } else {
                        console.warn(`Script from ${code} does not exist. Skipping...`);
                        if (code === paramOPENHOURS) {
                            v_schedule_logic = false;
                        }
                    }
                })
                .catch((error) => {
                console.info("Error loading "+error);  // Handle any loading errors
                });
            });
        }, Promise.resolve())
        .then(() => {
        console.log("All scripts loaded and functions called successfully!");
        })
        .catch((error) => {
        console.info("Error loading "+error);
        });
    }
