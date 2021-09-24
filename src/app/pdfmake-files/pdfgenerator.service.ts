import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.min';
import { BehaviorSubject } from 'rxjs';
import { CustomVFS } from './pdfmakefonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = CustomVFS.myVfs; // Read font noto
pdfMake.fonts = {
  Noto: {
    normal: 'noto-sans-regular.woff',
    bold: 'noto-sans-700.woff'
  },
  // Nirmala: {
  //   normal: 'nirmala_regular.woff',
  //   bold: 'nirmala_bold.woff',
  // },
  // TNR: {
  //   normal: 'tnr_regular.woff',
  //   bold: 'tnr_bold.woff',
  // },
  // Roboto:{
  //   normal:'Roboto-Regular.ttf',
  //   bold:'Roboto-Medium.ttf'
  // }
}

@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {
  formData: any =
  {
    "empCode": 512775,
    "empName": "Srajan Soni",
    "pensionType": "1",
    "reason": 11,
    "gender": "Male",
    "dob": "08-09-1996",
    "nationality": "Indian",
    "religion": "Hindu",
    "maritalStatus": "Single",
    "fhName": "Vinod Kumar Soni",
    "claimantName": "Srajan Soni",
    "orgAddress": {
      "addr1": "IndianOil-AOD SO",
      "addr2": "Sector 3",
      "addr3": "Noonmati",
      "pincode": 781020
    },
    "commAddress": {
      "addr1": "69/5 GRASIM STAFF COLONY",
      "addr2": "BIRLAGRAM NAGDA",
      "addr3": "UJJAIN",
      "city": "Nagda",
      "pincode": 456331
    },
    "mobileNo": 6913610123,
    "familyDetails": [
      {
        "name": "Laxmi Soni",
        "dob": "08-10-1974",
        "relationship": 8,
        "bankAccno": "33928578291"
      }
    ],
    "bankDetails": {
      "accNo": "00033928578291",
      "name": "State bank of India",
      "branch": "Main Branch",
      "address": "MG Road, Nagda",
      "city": "Nagda",
      "pincode": 456335
    },
    "identificationMarks": {
      "mark1": "Mole on right hand near thumb",
      "mark2": ""
    },
    "height": {
      "val": 5.11,
      "unit": "F"
    },
    "attachments": {
      "jointPics": false,
      "copyOfBankPassbook": true,
      "spouseDOBProof": true,
      "childrenDob": true,
      "selfAadharCopy": false,
      "declaration": true
    },
    "byEmpCode": 512775,
    "empModDate": "20-04-2019",
    "subDate": "20-04-2019",
    "name": "Srajan Soni",
    "claimStatus": {
      "dateOfSeparation": null
    },
    "pensionAmounts": [
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    ]
  }

  estdDetails: any =
  {
    "epsNo": "12345",
    "stMonth": "200709",
    "empCode": "512775",
    "object2": {
      "epfRegionCode": "MH",
      "epfSubregionCode": " ",
      "estdCompCd": "5279 / X",
      "estdName": "INDIAN OIL CORPORATION LTD",
      "estdAddr1": "INDIAN OIL BHAWAN",
      "estdAddr2": "G-9,ALIYAVARJUNGMARG,",
      "estdAddr3": "BANDRA(EAST)",
      "estdCity": "MUMBAI",
      "estdPin": "400051"
    }
  };

  constructor() { }

  generatePdfUrl(formData2: any, estdDetails: any, time: any) {
    let time2 = performance.now();
    //  this.formData=formData2;
    // this.estdDetails=estdDetails;
    // console.log(pdfFonts)
    var docDefinition = {
      pageMargins: [30, 80, 30, 80],
      header: this.getHeaderDD(),
      content: this.getPage1DD(),
      footer: this.getFooterDD(),
      styles: {
        header: {
          margin: [30, 10, 30, 30]
        },
        textHeader: {
          fontSize: 8,
          lineHeight: 1,
          color: 'red'
        },
        footer: {
          margin: [30, 10, 30, 30]
        }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        font: "Noto",
        fontSize: 10,
        lineHeight: 1.25
      },
      preserveSpace: {
        preserveLeadingSpaces: true
      }
    }
    let t3 = performance.now();
    let pdfUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    let t1 = performance.now();
    pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc: any) {
      let t2 = performance.now();
      pdfUrl$.next(outDoc);
    });
    return pdfUrl$;
  }

  // All document definitons for PDFMake stored here
  getHeaderDD(): any[] {
    return [
      {
        columns: [
          {
            table: {
                widths: [ '70%','30%'],
                body: [
                    [
                        {
                          image: CustomVFS.eps95logo,
                          width: 50, height: 50,
                        },
                        {
                          text: 'street\n\thouse number\nhouse number extension\nzip code\ncity',
                          alignment:'left',
                          style: 'textHeader'
                        }
                    ]
                ]
            },
            layout: 'noBorders'
          }
        ],
        style: 'header'
      },
    ]
  }

  getPage1DD(): any[] {
    return [
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      },


      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  { text: "1. Stack 1?", /*// font: "Nirmala"*/ },
                  { text: "\tBy whom is the pension claimed ?", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Member', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "left"
                  }
                ],
              },
              {
                stack: [
                  { text: "2. Stack 2", /*// font: "Nirmala"*/ },
                  { text: "\tType of pension claimed.", preserveLeadingSpaces: true },
                  {
                    table: {
                      widths: [160],
                      body: [
                        [{ text: 'Superannuation', }]
                      ]
                    },
                    margin: [10, 5],
                    alignment: "center"
                  }
                ],
              }
            ],
            [
              { text: "3.  Stack 3/ Member's Name :" },
              { text: "\t" + this.formData.name, bold: true, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 4:/ Sex :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.gender, preserveLeadingSpaces: true }
            ],
            [
              { text: "\t Stack 5:/ Marital Status :", preserveLeadingSpaces: true },
              { text: "\t" + this.formData.maritalStatus, preserveLeadingSpaces: true }
            ]
          ]
        },
        layout: {
          defaultBorder: false
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: "4. Table 4 :\n\tE.P.F. Account Number :", columnSpan: 2 , preserveLeadingSpaces:true}
              ,
              {
                table: {
                  widths: ['auto', 'auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: "col-1 :\nRO", border: [false], },
                      { text: "col-2:\nSRO", border: [false],},
                      { text: "col-3:\nEstablishment Code No.", border: [false], },
                      { text: "col-4:\nMember's Account No", border: [false],}
                    ], // Row 1
                    [
                      { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                      { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                      { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                    ] // Row 2
                  ]
                }
                ,
                alignment: "center",
                fontSize: 7,
                bold: true

              }
            ],
          ],
        },
        layout: {
          defaultBorder: false
        },
        margin: [0, 2, 0, 0]
      },
      {
        stack:[
          { text: "5. what:"},
          { text: "\tName & Address of the establishment in which the member was last employed:", preserveLeadingSpaces: true, fontSize: 9 },
        ],
      },
      {
        table: {
          widths: ['*', 150],
          body: [
            [{ text: "Indian Oil Corporation Limited", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr1 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [{ text: this.formData.orgAddress.addr2 || "", colSpan: 2, preserveLeasdingSpaces: true }, ''],
            [
              { border: [true, true, false, true], text: this.formData.orgAddress.addr3 || "", preserveLeasdingSpaces: true },
              { border: [false, true, true, true], text: "PIN: " + this.formData.orgAddress.pincode }
            ],
          ]
        }
      }
    ]
  }

  getFooterDD(): any[] {
    return [
      {
        columns: [
          {
            table: {
                widths: [ '50%','50%'],
                body: [
                    [
                        {
                          image: CustomVFS.eps95logo,
                          width: 50, height: 50,
                        },
                        {
                          table: {
                            widths: ['auto', 'auto', 'auto', 'auto'],
                            body: [
                              [
                                { text: "col-1 :\nRO", border: [false], },
                                { text: "col-2:\nSRO", border: [false],},
                                { text: "col-3:\nEstablishment Code No.", border: [false], },
                                { text: "col-4:\nMember's Account No", border: [false],}
                              ],
                              [
                                { fontSize: 8, text: this.estdDetails["object2"]["epfRegionCode"] || " " },
                                { fontSize: 8, text: this.estdDetails["object2"]["epfSubregionCode"] || " " },
                                { fontSize: 8, text: this.estdDetails["object2"]["estdCompCd"] || " " },
                                { fontSize: 8, text: this.estdDetails["epsNo"] || " " }
                              ]
                            ]
                          },
                          alignment: "center",
                          fontSize: 7,
                          bold: true
                        }
                    ]
                ]
            },
            layout: 'noBorders'
          }
        ],
        style: 'footer'
      },
    ]
  }
}
