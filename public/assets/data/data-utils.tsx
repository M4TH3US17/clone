import { DataENJSON, DataESJSON, DataPTJSON } from ".."

export function returnData(currentLanguage: string): object {
    let data = {}
    
    if(currentLanguage === 'pt')
        data = DataPTJSON

    if(currentLanguage === 'en')
        data = DataENJSON

    if(currentLanguage === 'es')
        data = DataESJSON

    return data
}
