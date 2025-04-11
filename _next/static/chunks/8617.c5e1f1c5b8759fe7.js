"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8617],{8617:(E,T,A)=>{A.r(T),A.d(T,{default:()=>N});var N=[Object.freeze({displayName:"DAX",name:"dax",patterns:[{include:"#comments"},{include:"#keywords"},{include:"#labels"},{include:"#parameters"},{include:"#strings"},{include:"#numbers"}],repository:{comments:{patterns:[{begin:"//",captures:{0:{name:"punctuation.definition.comment.dax"}},end:"\n",name:"comment.line.dax"},{begin:"--",captures:{0:{name:"punctuation.definition.comment.dax"}},end:"\n",name:"comment.line.dax"},{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.dax"}},end:"\\*/",name:"comment.block.dax"}]},keywords:{patterns:[{match:"\\b(YIELDMAT|YIELDDISC|YIELD|YEARFRAC|YEAR|XNPV|XIRR|WEEKNUM|WEEKDAY|VDB|VARX.S|VARX.P|VAR.S|VAR.P|VALUES|VALUE|UTCTODAY|UTCNOW|USERPRINCIPALNAME|USEROBJECTID|USERNAME|USERELATIONSHIP|USERCULTURE|UPPER|UNION|UNICODE|UNICHAR|TRUNC|TRUE|TRIM|TREATAS|TOTALYTD|TOTALQTD|TOTALMTD|TOPNSKIP|TOPNPERLEVEL|TOPN|TODAY|TIMEVALUE|TIME|TBILLYIELD|TBILLPRICE|TBILLEQ|TANH|TAN|T.INV.2T|T.INV|T.DIST.RT|T.DIST.2T|T.DIST|SYD|SWITCH|SUMX|SUMMARIZECOLUMNS|SUMMARIZE|SUM|SUBSTITUTEWITHINDEX|SUBSTITUTE|STDEVX.S|STDEVX.P|STDEV.S|STDEV.P|STARTOFYEAR|STARTOFQUARTER|STARTOFMONTH|SQRTPI|SQRT|SLN|SINH|SIN|SIGN|SELECTEDVALUE|SELECTEDMEASURENAME|SELECTEDMEASUREFORMATSTRING|SELECTEDMEASURE|SELECTCOLUMNS|SECOND|SEARCH|SAMPLE|SAMEPERIODLASTYEAR|RRI|ROW|ROUNDUP|ROUNDDOWN|ROUND|ROLLUPISSUBTOTAL|ROLLUPGROUP|ROLLUPADDISSUBTOTAL|ROLLUP|RIGHT|REPT|REPLACE|REMOVEFILTERS|RELATEDTABLE|RELATED|RECEIVED|RATE|RANKX|RANK.EQ|RANDBETWEEN|RAND|RADIANS|QUOTIENT|QUARTER|PV|PRODUCTX|PRODUCT|PRICEMAT|PRICEDISC|PRICE|PREVIOUSYEAR|PREVIOUSQUARTER|PREVIOUSMONTH|PREVIOUSDAY|PPMT|POWER|POISSON.DIST|PMT|PI|PERMUT|PERCENTILEX.INC|PERCENTILEX.EXC|PERCENTILE.INC|PERCENTILE.EXC|PDURATION|PATHLENGTH|PATHITEMREVERSE|PATHITEM|PATHCONTAINS|PATH|PARALLELPERIOD|OR|OPENINGBALANCEYEAR|OPENINGBALANCEQUARTER|OPENINGBALANCEMONTH|ODDLYIELD|ODDLPRICE|ODDFYIELD|ODDFPRICE|ODD|NPER|NOW|NOT|NORM.S.INV|NORM.S.DIST|NORM.INV|NORM.DIST|NONVISUAL|NOMINAL|NEXTYEAR|NEXTQUARTER|NEXTMONTH|NEXTDAY|NATURALLEFTOUTERJOIN|NATURALINNERJOIN|MROUND|MONTH|MOD|MINX|MINUTE|MINA|MIN|MID|MEDIANX|MEDIAN|MDURATION|MAXX|MAXA|MAX|LOWER|LOOKUPVALUE|LOG10|LOG|LN|LEN|LEFT|LCM|LASTNONBLANKVALUE|LASTNONBLANK|LASTDATE|KEYWORDMATCH|KEEPFILTERS|ISTEXT|ISSUBTOTAL|ISSELECTEDMEASURE|ISPMT|ISONORAFTER|ISODD|ISO.CEILING|ISNUMBER|ISNONTEXT|ISLOGICAL|ISINSCOPE|ISFILTERED|ISEVEN|ISERROR|ISEMPTY|ISCROSSFILTERED|ISBLANK|ISAFTER|IPMT|INTRATE|INTERSECT|INT|IGNORE|IFERROR|IF.EAGER|IF|HOUR|HASONEVALUE|HASONEFILTER|HASH|GROUPBY|GEOMEANX|GEOMEAN|GENERATESERIES|GENERATEALL|GENERATE|GCD|FV|FORMAT|FLOOR|FIXED|FIRSTNONBLANKVALUE|FIRSTNONBLANK|FIRSTDATE|FIND|FILTERS|FILTER|FALSE|FACT|EXPON.DIST|EXP|EXCEPT|EXACT|EVEN|ERROR|EOMONTH|ENDOFYEAR|ENDOFQUARTER|ENDOFMONTH|EFFECT|EDATE|EARLIEST|EARLIER|DURATION|DOLLARFR|DOLLARDE|DIVIDE|DISTINCTCOUNTNOBLANK|DISTINCTCOUNT|DISTINCT|DISC|DETAILROWS|DEGREES|DDB|DB|DAY|DATEVALUE|DATESYTD|DATESQTD|DATESMTD|DATESINPERIOD|DATESBETWEEN|DATEDIFF|DATEADD|DATE|DATATABLE|CUSTOMDATA|CURRENTGROUP|CURRENCY|CUMPRINC|CUMIPMT|CROSSJOIN|CROSSFILTER|COUPPCD|COUPNUM|COUPNCD|COUPDAYSNC|COUPDAYS|COUPDAYBS|COUNTX|COUNTROWS|COUNTBLANK|COUNTAX|COUNTA|COUNT|COTH|COT|COSH|COS|CONVERT|CONTAINSSTRINGEXACT|CONTAINSSTRING|CONTAINSROW|CONTAINS|CONFIDENCE.T|CONFIDENCE.NORM|CONCATENATEX|CONCATENATE|COMBINEVALUES|COMBINA|COMBIN|COLUMNSTATISTICS|COALESCE|CLOSINGBALANCEYEAR|CLOSINGBALANCEQUARTER|CLOSINGBALANCEMONTH|CHISQ.INV.RT|CHISQ.INV|CHISQ.DIST.RT|CHISQ.DIST|CEILING|CALENDARAUTO|CALENDAR|CALCULATETABLE|CALCULATE|BLANK|BETA.INV|BETA.DIST|AVERAGEX|AVERAGEA|AVERAGE|ATANH|ATAN|ASINH|ASIN|APPROXIMATEDISTINCTCOUNT|AND|AMORLINC|AMORDEGRC|ALLSELECTED|ALLNOBLANKROW|ALLEXCEPT|ALLCROSSFILTERED|ALL|ADDMISSINGITEMS|ADDCOLUMNS|ACOTH|ACOT|ACOSH|ACOS|ACCRINTM|ACCRINT|ABS)\\b",name:"variable.language.dax"},{match:"\\b(DEFINE|EVALUATE|ORDER BY|RETURN|VAR)\\b",name:"keyword.control.dax"},{match:"(?x)\n{ | }",name:"keyword.array.constructor.dax"},{match:"(?x)\n> | < | >= | <= | =(?!==)\n",name:"keyword.operator.comparison.dax"},{match:"(?x)\n&& | IN | NOT | \\|\\|",name:"keyword.operator.logical.dax"},{match:"(?x)\n\\+ | \\- | \\* | \\/\n",name:"keyword.arithmetic.operator.dax"},{begin:"\\[",end:"\\]",name:"support.function.dax"},{begin:'"',end:'"',name:"string.quoted.double.dax"},{begin:"\\'",end:"\\'",name:"support.class.dax"}]},labels:{patterns:[{captures:{1:{name:"punctuation.separator.label.dax"},2:{name:"entity.name.label.dax"}},match:"(^(.*?)\\s*(:=|!=))"}]},metas:{patterns:[{begin:"\\(",beginCaptures:{0:{name:"meta.brace.round.dax"}},end:"\\)",endCaptures:{0:{name:"meta.brace.round.dax"}}}]},numbers:{match:"(?x)\n-?\n(?:\n0\n|\n[1-9]\n\\d*\n)\n(?:\n(?:\n\\.\n\\d+\n)?\n(?:\n[eE]\n[+-]?\n\\d+\n)?\n)?",name:"constant.numeric.dax"},parameters:{patterns:[{begin:"\\b(?<!\\.)(VAR)\\b(?<!\\.)\\b",beginCaptures:{1:{name:"keyword.control.dax"},2:{name:"variable.other.readwrite.dax"}},comment:"build out variable assignment",end:"=",endCaptures:{0:{name:"keyword.operator.assignment.dax"}},name:"meta.function.definition.parameters.dax",patterns:[{match:"(?x)\n=\n",name:"keyword.control.dax"}]},{match:"[_$[:alpha:]][_$[:alnum:]]*",name:"variable.other.constant.dax"}]},strings:{begin:'"',end:'"',name:"string.quoted.double.dax",patterns:[{match:"\\\\.",name:"constant.character.escape.dax"}]}},scopeName:"source.dax"})]}}]);