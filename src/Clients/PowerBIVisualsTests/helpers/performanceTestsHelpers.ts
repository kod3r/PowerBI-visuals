﻿/*
*  Power BI Visualizations
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved. 
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*   
*  The above copyright notice and this permission notice shall be included in 
*  all copies or substantial portions of the Software.
*   
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/

/// <reference path="../_references.ts"/>

module powerbitests.performanceTestsHelpers {
    import DataViewValueColumns = powerbi.DataViewValueColumns;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import DataViewMatrix = powerbi.DataViewMatrix;

    export function getDataViewByVisual(visualsType: String): powerbi.DataView {

        var dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);

        switch (visualsType) {

            case "gauge":
                var gaugeDataViewMetadata: powerbi.DataViewMetadata = {
                    columns: [
                        {
                            displayName: "col1",
                            roles: { "Y": true },
                            isMeasure: true
                        }, {
                            displayName: "col2",
                            roles: { "MinValue": true },
                            isMeasure: true
                        }, {
                            displayName: "col3",
                            roles: { "MaxValue": true },
                            isMeasure: true
                        }, {
                            displayName: "col4",
                            roles: { "TargetValue": true },
                            isMeasure: true
                        }],
                    groups: [],
                    measures: [0]
                };

                return {
                    metadata: gaugeDataViewMetadata,
                    single: { value: 500 },
                    categorical: {
                        values: DataViewTransform.createValueColumns([
                            {
                                source: gaugeDataViewMetadata.columns[0],
                                values: [500]
                            }, {
                                source: gaugeDataViewMetadata.columns[1],
                                values: [0]
                            }, {
                                source: gaugeDataViewMetadata.columns[2],
                                values: [500]
                            }, {
                                source: gaugeDataViewMetadata.columns[3],
                                values: [200]
                            }])
                    }
                };

            case "table":
                var tableColumns = getYears().map((year, index) => { return { displayName: String(year), type: dataTypeNumber, index: index }; });
                return {
                    metadata: { columns: tableColumns },
                    table: {
                        columns: tableColumns,
                        rows: [getPopulationUSA(), getPopulationCanada()]
                    }
                };
            case "matrix":
                var dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);
                var measureSource1: DataViewMetadataColumn = { displayName: "measure1", type: dataTypeNumber, isMeasure: true, index: 3, objects: { general: { formatString: "#.0" } } };
                var measureSource2: DataViewMetadataColumn = { displayName: "measure2", type: dataTypeNumber, isMeasure: true, index: 4, objects: { general: { formatString: "#.00" } } };
                var measureSource3: DataViewMetadataColumn = { displayName: "measure3", type: dataTypeNumber, isMeasure: true, index: 5, objects: { general: { formatString: "#" } } };

                var rowGroupSource1: DataViewMetadataColumn = { displayName: "RowGroup1", queryName: "RowGroup1", type: dataTypeString, index: 0 };
                var rowGroupSource2: DataViewMetadataColumn = { displayName: "RowGroup2", queryName: "RowGroup2", type: dataTypeString, index: 1 };
                var rowGroupSource3: DataViewMetadataColumn = { displayName: "RowGroup3", queryName: "RowGroup3", type: dataTypeString, index: 2 };

                var matrixThreeMeasuresThreeRowGroups: DataViewMatrix = {
                    rows: {
                        root: {
                            children: [{
                                level: 0,
                                value: "North America",
                                children: [{
                                    level: 1,
                                    value: "Canada",
                                    children: [{
                                        level: 2,
                                        value: "Ontario",
                                        values: {
                                            0: {
                                                value: 1000
                                            },
                                            1: {
                                                value: 1001,
                                                valueSourceIndex: 1
                                            },
                                            2: {
                                                value: 1002,
                                                valueSourceIndex: 2
                                            }
                                        }
                                    }, {
                                            level: 2,
                                            value: "Quebec",
                                            values: {
                                                0: {
                                                    value: 1010
                                                },
                                                1: {
                                                    value: 1011,
                                                    valueSourceIndex: 1
                                                },
                                                2: {
                                                    value: 1012,
                                                    valueSourceIndex: 2
                                                }
                                            }
                                        }]
                                }, {
                                        level: 1,
                                        value: "USA",
                                        children: [{
                                            level: 2,
                                            value: "Washington",
                                            values: {
                                                0: {
                                                    value: 1100
                                                },
                                                1: {
                                                    value: 1101,
                                                    valueSourceIndex: 1
                                                },
                                                2: {
                                                    value: 1102,
                                                    valueSourceIndex: 2
                                                }
                                            }
                                        }, {
                                                level: 2,
                                                value: "Oregon",
                                                values: {
                                                    0: {
                                                        value: 1110
                                                    },
                                                    1: {
                                                        value: 1111,
                                                        valueSourceIndex: 1
                                                    },
                                                    2: {
                                                        value: 1112,
                                                        valueSourceIndex: 2
                                                    }
                                                }
                                            }]
                                    }]
                            }, {
                                    level: 0,
                                    value: "South America",
                                    children: [{
                                        level: 1,
                                        value: "Brazil",
                                        children: [{
                                            level: 2,
                                            value: "Amazonas",
                                            values: {
                                                0: {
                                                    value: 2000
                                                },
                                                1: {
                                                    value: 2001,
                                                    valueSourceIndex: 1
                                                },
                                                2: {
                                                    value: 2002,
                                                    valueSourceIndex: 2
                                                }
                                            }
                                        }, {
                                                level: 2,
                                                value: "Mato Grosso",
                                                values: {
                                                    0: {
                                                        value: 2010
                                                    },
                                                    1: {
                                                        value: 2011,
                                                        valueSourceIndex: 1
                                                    },
                                                    2: {
                                                        value: 2012,
                                                        valueSourceIndex: 2
                                                    }
                                                }
                                            }]
                                    }, {
                                            level: 1,
                                            value: "Chile",
                                            children: [{
                                                level: 2,
                                                value: "Arica",
                                                values: {
                                                    0: {
                                                        value: 2100
                                                    },
                                                    1: {
                                                        value: 2101,
                                                        valueSourceIndex: 1
                                                    },
                                                    2: {
                                                        value: 2102,
                                                        valueSourceIndex: 2
                                                    }
                                                }
                                            }, {
                                                    level: 2,
                                                    value: "Parinacota",
                                                    values: {
                                                        0: {
                                                            value: 2110
                                                        },
                                                        1: {
                                                            value: 2111,
                                                            valueSourceIndex: 1
                                                        },
                                                        2: {
                                                            value: 2112,
                                                            valueSourceIndex: 2
                                                        }
                                                    }
                                                }]
                                        }]
                                }

                            ]
                        },
                        levels: [{
                            sources: [rowGroupSource1]
                        }, {
                                sources: [rowGroupSource2]
                            }, {
                                sources: [rowGroupSource3]
                            }]
                    },
                    columns: {
                        root: {
                            children: [{
                                level: 0
                            }, {
                                    level: 0,
                                    levelSourceIndex: 1
                                }, {
                                    level: 0,
                                    levelSourceIndex: 2
                                }]
                        },
                        levels: [{
                            sources: [
                                measureSource1,
                                measureSource2,
                                measureSource3]
                        }]
                    },
                    valueSources: [
                        measureSource1,
                        measureSource2,
                        measureSource3]
                };

                return {
                    metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
                    matrix: matrixThreeMeasuresThreeRowGroups
                };
            case "texbox":
                return {
                    metadata: {
                        columns: [],
                        objects: {
                            general: {
                                paragraphs: [
                                    {
                                        horizontalTextAlignment: "center",
                                        textRuns: [{
                                            value: "Example Text",
                                            textStyle: {
                                                fontFamily: "Heading",
                                                fontSize: "24px",
                                                textDecoration: "underline",
                                                fontWeight: "300",
                                                fontStyle: "italic",
                                                float: "left"
                                            }
                                        }]
                                    }]
                            }
                        }
                    }
                };
            case "image":
                var imageBase64value = "data:image/png;base64,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";

                return {
                    metadata: {
                        columns: [],
                        objects: { general: { imageUrl: imageBase64value } }
                    }
                };
            case "multiRowCard":
                var tableDataValues1 = getYears().map((year, index) => [year, getPopulationUSA()[index], getPopulationCanada()[index]]);

                return {
                    metadata: {
                        columns: []
                    },
                    table: {
                        rows: tableDataValues1,
                        columns: [
                            {
                                displayName: "Year",
                                queryName: "year",
                                type: ValueType.fromDescriptor({ number: true })
                            }, {
                                displayName: "Population of USA",
                                isMeasure: true,
                                queryName: "population",
                                type: powerbi.ValueType.fromDescriptor({ numeric: true })
                            }, {
                                displayName: "Population of Canada",
                                isMeasure: true,
                                queryName: "populationCanada",
                                type: powerbi.ValueType.fromDescriptor({ numeric: true })
                            }

                        ]
                    }
                };
            case "dotPlot":
                let dotPlotValues: number[] = [
                    1, 2, 3, 4, 5, 6, 7, 8, 9,
                    2, 3, 3, 4, 4, 4, 5, 5, 5, 5,
                    6, 6, 6, 7, 7, 8
                ],
                dotPlotDataViewMetadata: powerbi.DataViewMetadata = {
                    columns: [{
                        displayName: "Observations",
                        queryName: "Observations",
                        type: ValueType.fromDescriptor({
                            text: true
                        }),
                        objects: {
                            dataPoint: {
                                fill: {
                                    solid: {
                                        color: "rgb(1, 184, 170)"
                                    }
                                }
                            }
                        }
                    }]
                },
                dotPlotColumns = [{
                    source: dotPlotDataViewMetadata.columns[0],
                    values: dotPlotValues
                }],
                dotPlotDataValues: DataViewValueColumns =
                    DataViewTransform.createValueColumns(dotPlotColumns);

                return {
                    metadata: dotPlotDataViewMetadata,
                    categorical: {
                        values: dotPlotDataValues
                    }
                };

            case "radarChart":
                let radarChartValues: number[] = [59, 56, 42, 34, 48, 14, 11, 5, 7, 78, 85, 90, 18, 7, 8, 9, 10],
                    radarChartDataViewMetadata: powerbi.DataViewMetadata = {
                        columns: [
                            {
                                displayName: 'Devices',
                                queryName: 'Devices',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Smartphone',
                                isMeasure: true,
                                format: "0.00",
                                queryName: 'smartphone',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                objects: { dataPoint: { fill: { solid: { color: '#1F77B4' } } } },
                            },
                            {
                                displayName: 'Tablet',
                                isMeasure: true,
                                format: "0.00",
                                queryName: 'Tablet',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                objects: { dataPoint: { fill: { solid: { color: '#FF7F0E' } } } }
                            }
                        ]
                    },
                    radarChartColumns = [{
                        source: radarChartDataViewMetadata.columns[1],
                        values: radarChartValues
                    }],
                    radarChartDataValues: DataViewValueColumns =
                        DataViewTransform.createValueColumns(radarChartColumns);

                return {
                    metadata: radarChartDataViewMetadata,
                    categorical: {
                        categories: [{
                            source: radarChartDataViewMetadata.columns[0],
                            values: radarChartDataValues,
                            identity: categoryIdentities,
                        }],
                        values: radarChartDataValues
                    }
                };

            default:
                var fieldExpr = powerbi.data.SQExprBuilder.fieldExpr({ column: { schema: "s", entity: "table1", name: "country" } });

                var categoryIdentities = getYears().map((value) => {
                    return powerbi.data.createDataViewScopeIdentity(powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(String(value))));
                });

                var columns = [
                    {
                        source: {
                            displayName: "Population of USA",
                            queryName: "usa",
                            type: powerbi.ValueType.fromDescriptor({ numeric: true })
                        },
                        values: getPopulationUSA()
                    },
                    {
                        source: {
                            displayName: "Population of Canada",
                            queryName: "canada",
                            type: powerbi.ValueType.fromDescriptor({ numeric: true })
                        },
                        values: getPopulationCanada()
                    }
                ];

                var dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);

                var metadata = {
                    columns: [
                        {
                            displayName: "Population",
                            queryName: "population",
                            type: powerbi.ValueType.fromDescriptor({ text: true })
                        }
                    ]
                };

                var data = {
                    metadata: metadata,
                    categorical: {
                        categories: [
                            {
                                source: metadata.columns[0],
                                values: getYears(),
                                identity: categoryIdentities
                            }
                        ],
                        values: dataValues
                    },
                    single: { value: 559.43 }
                };

                return data;
        }
    }

    export function getExpectedTime(visualsType: String, defaultMeasureTime: number) {
        return defaultMeasureTime * getCorrectionFactor(visualsType);
    }

    function getCorrectionFactor(visualsType: String) {
        switch (visualsType) {
            case "donutChart":
            case "pieChart":
                return 100;
            default:
                return 6;
        }
    }

    export class Timer {

        private startTime: number = 0;
        private diffTime: number = 0;

        public start(): Timer {
            this.startTime = Date.now();
            return this;
        }

        public pause(): Timer {
            this.diffTime += Date.now() - this.startTime;
            return this;
        }

        public stop(): number {
            return Date.now() - this.startTime;
        }

        public getResult(): number {
            return this.diffTime;
        }
    }

    function getYears(): number[] {
        return [
            1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950,
            1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
            1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988,
            1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
            2008, 2009, 2010, 2011, 2012, 2013
        ];
    }

    function getPopulationUSA(): number[] {
        return [
            127.362, 128.181, 128.961, 129.969, 131.028, 132.165, 133.002, 134.464, 136.003, 138.083, 139.994, 140.008,
            145.023, 148.013, 149.336, 151.861, 154.056, 156.431, 159.047, 161.948, 163.476, 166.578, 169.637, 172.668,
            175.642, 179.979, 182.992, 185.771, 188.483, 191.141, 193.526, 195.576, 197.457, 199.399, 201.385, 203.984,
            206.827, 209.284, 211.357, 213.342, 215.465, 217.563, 219.760, 222.095, 224.567, 227.225, 229.466, 231.664,
            233.792, 235.825, 237.924, 240.133, 242.289, 244.499, 246.819, 249.623, 252.981, 256.514, 259.919, 263.126,
            266.278, 269.394, 272.647, 275.854, 279.040, 282.172, 285.082, 287.804, 290.326, 293.046, 295.753, 298.593,
            301.580, 304.375, 307.007, 309.330, 311.583, 313.874, 316.129
        ];
    }

    function getPopulationCanada(): number[] {
        return [
            11.135, 11.242, 11.339, 11.448, 11.565, 11.682, 11.810, 11.962, 12.125, 12.291, 12.441,
            12.637, 12.919, 13.167, 13.475, 13.737, 14.050, 14.496, 14.886, 15.330, 15.736, 16.123, 16.677, 17.120,
            17.522, 17.909, 18.271, 18.614, 18.964, 19.325, 19.678, 20.048, 20.412, 20.744, 21.028, 21.324, 21.962,
            22.218, 22.492, 22.808, 23.143, 23.450, 23.726, 23.963, 24.202, 24.516, 24.820, 25.117, 25.367, 25.608,
            25.843, 26.101, 26.449, 26.795, 27.282, 27.698, 28.031, 28.367, 28.682, 28.999, 29.302, 29.611, 29.907,
            30.157, 30.404, 30.689, 31.021, 31.373, 31.676, 31.941, 32.245, 32.576, 32.930, 33.318, 33.727, 34.127,
            34.484, 34.880, 35.100
        ];
    }

}