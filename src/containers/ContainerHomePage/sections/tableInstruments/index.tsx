import { TranslationT } from "@/types/general";
import React from "react";
import { Link } from "@/i18n/routing"; // Assuming Link is imported from your routing setup

// Define the shape of each row in the table
interface InstrumentRow {
  commodity: string;
  tradingCurrency: string;
  swapLong: string;
  swapShort: string;
  href: string;
}

export const TableInstruments = ({ t }: { t: TranslationT }) => {
  // raw data pulled from your Framer HTML
  const tableData: InstrumentRow[] = [
    { commodity: "GER40", tradingCurrency: "0,8", swapLong: "-37,20", swapShort: "1.03", href: "/trading-indices" },
    { commodity: "EURUSD", tradingCurrency: "0,5", swapLong: "-7,5", swapShort: "1,1", href: "/trading-forex-cfds" },
    { commodity: "GBPUSD", tradingCurrency: "0,7", swapLong: "-4,5", swapShort: "-2,95", href: "/trading-forex-cfds" },
    { commodity: "USDJPY", tradingCurrency: "1", swapLong: "7,9", swapShort: "-34,9", href: "/trading-forex-cfds" },
    { commodity: "EURGBP", tradingCurrency: "1,2", swapLong: "-5,65", swapShort: "1,2", href: "/trading-forex-cfds" },
    { commodity: "EURJPY", tradingCurrency: "1,8", swapLong: "4,8", swapShort: "-29,5", href: "/trading-forex-cfds" },
    { commodity: "USDMXN", tradingCurrency: "40", swapLong: "-440,8", swapShort: "242,27", href: "/trading-forex-cfds" },
    { commodity: "GOLD", tradingCurrency: "0,02", swapLong: "-5,9", swapShort: "2,8", href: "/trading-commodities" },
    { commodity: "WTI", tradingCurrency: "0,02", swapLong: "-1,5", swapShort: "-0,5", href: "/trading-commodities" },
    { commodity: "BRENT", tradingCurrency: "0,03", swapLong: "-0,5", swapShort: "-0,5", href: "/trading-commodities" },
    { commodity: "WS30", tradingCurrency: "1,9", swapLong: "-97,80", swapShort: "10,48", href: "/trading-indices" },
    { commodity: "NAS100", tradingCurrency: "2", swapLong: "-46,86", swapShort: "5,02", href: "/trading-indices" },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto py-20">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-5xl">
          {t("HomeComoditiesInstrumentsTitle")}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Commodity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Trading Currency
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Swap Rates Long
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Swap Rates Short
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row.commodity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {row.tradingCurrency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {row.swapLong}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {row.swapShort}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
             
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
