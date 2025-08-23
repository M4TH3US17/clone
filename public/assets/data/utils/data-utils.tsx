
import { ArticleDescription } from "@/components/article/section/components/article-description"
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

    console.log(data)

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

                for (const textKey in description) {
                    if (description[textKey]?.hasOwnProperty('paragraphs')) {
                        const paragraphs = description[textKey].paragraphs.map((paragraph: any) => (paragraph.hasOwnProperty('links')) ? paragraph = adjustLink(paragraph) : {})
                        description[textKey] = { ...description[textKey], paragraphs }
                    }

                    if (description[textKey]?.hasOwnProperty('links')) {
                        description[textKey] = adjustLink(description[textKey]);
                    }
                }

            } else {
                // Se não for description, processa recursivamente
                data[key] = processDescriptions(data[key]);
            }
        }
    }

    return data;
}

function adjustLink(descriptionObject: any): any {
    descriptionObject.links.map((link: any) => descriptionObject.text = descriptionObject.text.replace(link.breakpoint, `<a href='${link.href}' class="link-article">${link.text}</a>`))

    const isListagem = descriptionObject.items
    if (isListagem) {
        const listagem = descriptionObject.items

        const objeto_listagem_li_formatado = listagem.map((listItemObject: any) => {
            let hasLinks = listItemObject.links

            if (hasLinks) {
                let links = listItemObject.links
                links.map((link: any) => listItemObject.li = listItemObject.li.replace(link.breakpoint, `<a href='${link.href}'>${link.text}</a>`))

                // if (listItemObject.subList) {
                //     return { li: listItemObject.li, subList: listItemObject.subList }
                // }
                return listItemObject.li
            }
        })

        descriptionObject.items = objeto_listagem_li_formatado
        const { links, ...listagem_formatada } = descriptionObject;
        return listagem_formatada;
    }

    return { text: descriptionObject.text, props: descriptionObject.props };
}

export function formatJsonDisplay(media: any) {
    try {
        const jsonObj = window.JSON.parse(media.json);

        const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
            navigator.clipboard.writeText(window.JSON.stringify(jsonObj, null, 2));
            const button = e.currentTarget;
            const originalText = button.textContent;
            button.textContent = 'Copiado';

            setTimeout(() => {
                if (button) button.textContent = originalText || 'Copiar';
            }, 2000);
        };

        return (
            <div className="relative">
                <ArticleDescription description={media?.description?.filter(
                    (desc: any) => desc?.props?.verticalPosition === 'TOP'
                )} />

                <div
                    style={{
                        position: 'relative',
                        fontSize: '0.875rem',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderWidth: '1px',
                        borderColor: '#333',
                        background: '#1E1E1E',
                        color: '#D4D4D4',
                        overflow: 'auto',
                    }}
                >
                    <div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                left: '1rem',
                                fontSize: '0.75rem',
                                color: '#AAAAAA',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: 600,
                            }}
                        >
                            JSON
                        </div>

                        <button
                            onClick={handleCopy}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '1rem',
                                fontSize: '0.75rem',
                                color: '#CCCCCC',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                padding: '0.25rem 0.5rem',
                                border: 'none',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease-in-out',
                            }}
                        >
                            Copiar
                        </button>
                    </div>

                    <pre
                        style={{
                            marginTop: '1.5rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        <code>{window.JSON.stringify(jsonObj, null, 2)}</code>
                    </pre>
                </div>

                <ArticleDescription description={media?.description?.filter(
                    (desc: any) => desc?.props?.verticalPosition === 'BOTTOM'
                )} />
            </div>
        );
    } catch (e: any) {
        return (
            <div
                style={{
                    backgroundColor: '#FFECEC',
                    color: '#D00',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #FCC',
                }}
            >
                JSON inválido: {e.message}
            </div>
        );
    }
}
