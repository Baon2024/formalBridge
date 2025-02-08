'use client'


const jwtToken = localStorage.getItem('jwt');



export default async function getCollegeInfo(selectCollege) {
    console.log("selectCollege inside of getCollegeInfo is:", selectCollege);

    
    
    const collegeIds = {
        "King's": "d6je12re1e3uru19djuz7w9u",
        "Queen's": "soc1xm7mr7bb529bskey6y2t",
        "John's": 31,
        "Christ's": 41,
        "Selwyn": 5,
        "Corpus Christi": 6,
        "Madgalene": 7,
        "Peterhouse": 8,
        "Murray Edwards": 9,
        "Darwin": 10,
        "Wolfson": 11,
        "St Edmunds": 12,
        "Churchill": 13
    };
    
    let id = collegeIds[selectCollege] || null; // Default to `null` if not found



    const url = `http://localhost:1338/api/college-informations/${id}`;

    console.log("url with college id is:", url);
    console.log("jwtToken before function call:", jwtToken);
    
        const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-type": "application/json",
               "Authorization": `Bearer ${jwtToken}`
          },
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }
      
        const jsonResponse = await response.json();
        console.log("collegInfo returned inside of getCollegeInfo function is:", jsonResponse);
        return jsonResponse;


}

