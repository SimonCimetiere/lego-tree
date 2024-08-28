const parseCSV = async pathname => {
    return fetch( pathname )
        .then( response => response.text() )
        .then( responseText => {
            const tab = responseText.split('\r\n').map(element => element.split(','))
            const titleRow = tab[0]
            const parsedCSV = []
            for (let i = 1; i < tab.length-1; i++) {
                const obj = {}
                for(let y= 0;y < tab[i].length;y++) {
                    obj[titleRow[y]]=tab[i][y]
                }
                 parsedCSV.push(obj)
              }
            return parsedCSV
          })
};

export default parseCSV;
