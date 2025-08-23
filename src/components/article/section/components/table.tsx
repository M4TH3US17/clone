import clsx from "clsx"
import { FC } from "react"
import { ITableProps } from "@/publicassets/data/utils/data-interfaces";
import parse from 'html-react-parser';

export const Table: FC<{ table: any, props?: ITableProps[] }> = ({ table, props }) => {
    return <div className={clsx(
        "w-full",
        table?.props?.className
    )}>
        <table className="w-full overflow-hidden border-separate border-spacing-0 rounded-lg" key={table.order}>
            <thead className="bg-gray-100">
                <tr>
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tl-lg" style={{ width: table?.type ? "33.33%" : "30%" }}>Campo</th>
                    {table?.type && <th className="text-left text-[0.8rem] text-secondary p-3" style={{ width: table?.type ? "33.33%" : "" }}>Tipo</th>}
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tr-lg" style={{ width: table?.type ? "33.33%" : "70%" }}>Descrição</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    table.rows.map((row: any, index: number) => {
                        if ('fields' in row) {
                            return <tr key={`row-${index}`}>
                                <td className="whitespace-nowrap text-[0.8rem]">{row.field}</td>
                                {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">object</td> : <></>}
                                <td className="" colSpan={2}>
                                    <div className="p-2">
                                        {
                                            <p className="mb-2 text-[0.8rem] text-secondary font-semibold">{row.description}</p>
                                        }
                                        <table className="w-full divide-y divide-gray-200 border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="text-left text-[0.8rem] text-secondary">Campo</th>
                                                    {table?.type ? <th className="text-left text-[0.8rem] text-secondary">Tipo</th> : <></>}
                                                    <th className="text-left text-[0.8rem] text-secondary">Descrição</th>
                                                    {/* <th className="text-left  uppercase">Exemplo</th> */}
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                {
                                                    row.fields.map((subRow: any, subIndex: number) => (
                                                        <tr key={`subrow-${index}-${subIndex}`} className="">
                                                            <td className="whitespace-nowrap text-[0.8rem]">{subRow.field}</td>
                                                            {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">{subRow.type}</td> : <></>}
                                                            <td className=" text-[0.8rem]">{subRow.description}</td>
                                                            {/* <td className="whitespace-nowrap ">{subRow.example}</td> */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        } else {
                            return (<tr key={`row-${index}`} className="">
                                <td className="whitespace-nowrap text-[0.8rem]">{row.field}</td>
                                {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">{row.type}</td> : <></>}
                                <td className=" text-[0.8rem]">{row.description}</td>
                                {/* <td className="whitespace-nowrap text-gray-500">{row.example}</td> */}
                            </tr>)
                        }
                    })
                }
            </tbody>
        </table>
    </div>
}