import { DataENJSON, DataESJSON, DataPTJSON } from "../.."

export function returnData(currentLanguage: string): object {
    let data = {}

    if (currentLanguage === 'pt')
        data = DataPTJSON

    if (currentLanguage === 'en')
        data = DataENJSON

    if (currentLanguage === 'es')
        data = DataESJSON

    processDescriptions(data)

    return data
}

/* 
   Percorre todos os objetos em data fazendo inserindo ajustando os links
*/
function processDescriptions(data: any): any {
    if (data === null || typeof data !== 'object') return data;

    if (Array.isArray(data)) return data.map(item => processDescriptions(item));

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (key === 'description' && typeof data[key] === 'object') {
                const description = data[key];

                for (const textKey in description)
                    if (description[textKey]?.hasOwnProperty('links'))
                        description[textKey] = adjustLink(description[textKey]);

            } else {
                // Se não for description, processa recursivamente
                data[key] = processDescriptions(data[key]);
            }
        }
    }

    return data;
}

function adjustLink(descriptionObject: any): object {
    descriptionObject.links.map((link: any) => {
        descriptionObject.text = descriptionObject.text.replace(link.breakpoint, `<a href='${link.href}'>${link.text}</a>`)
    })

    return { text: descriptionObject.text };
}