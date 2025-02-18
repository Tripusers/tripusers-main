import { getTrendingInternational } from "@/sanity/sanity-utils";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { z } from "zod";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
    try {
        const account = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_Password,
            },
        });
        await account.verify();
        const getTrend = (await getTrendingInternational()) as any;
        const SortGetTrend = getTrend.filter((v: any) => v.isTrending);
        const s = SortGetTrend.sort(() => Math.random() - 0.5);
        const randomTrend = s.slice(0, 4).filter((v: any) => v);
        const reA = [
            [randomTrend[0], randomTrend[1]],
            [randomTrend[2], randomTrend[3]],
        ];
        const trandHtml = reA
            .map(
                (v, i) => `
    
    <div
    class="u-row-container"
    style="padding: 0px; background-color: transparent"
    >
    <div
      class="u-row"
      style="
        margin: 0 auto;
        min-width: 320px;
        max-width: 600px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        background-color: transparent;
      "
    >
      <div
        style="
          border-collapse: collapse;
          display: table;
          width: 100%;
          height: 100%;
          background-color: transparent;
        "
      >
      ${v
                        .map(
                            (dd) => `
      <div
      class="u-col u-col-50"
      style="
        max-width: 320px;
        min-width: 300px;
        display: table-cell;
        vertical-align: top;
      "
    >
      <!-- Dynamic Linking -->
      <!-- Dynamic Linking -->
      <!-- Dynamic Linking -->
      <a
        href="https://www.tripusers.com/international/${dd.slug as string}"
        style="text-decoration: none"
      >
        <div
          style="
            background-color: #ffffff;
            height: 100%;
            width: 100% !important;
            border-radius: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
          "
        >
          <!-- [if (!mso)&(!IE)]><!-->
          <div
            style="
              box-sizing: border-box;
              height: 100%;
              padding: 0px;
              border-radius: 0px;
              -webkit-border-radius: 0px;
              -moz-border-radius: 0px;
              border: 0px solid transparent;
            "
          >
            <!--<![endif]-->
            <table
              style="font-family: arial, helvetica, sans-serif"
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      overflow-wrap: break-word;
                      word-break: break-word;
                      padding: 10px;
                      font-family: arial, helvetica, sans-serif;
                    "
                    align="left"
                  >
                    <table
                      border="0"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="padding-right: 0px;padding-left: 0px;background-image: url('${dd.cardImage
                                }');height: 200px;background-size: cover;background-repeat: no-repeat;background-position: center;border-radius: 10px;"
                            align="center"
                          >
                          
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              style="font-family: arial, helvetica, sans-serif"
              role="presentation"
              border="0"
              width="100%"
              cellspacing="0"
              cellpadding="0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      overflow-wrap: break-word;
                      word-break: break-word;
                      padding: 0px;
                      font-family: arial, helvetica, sans-serif;
                    "
                    align="left"
                  >
                    <div
                      style="
                        font-family: helvetica, sans-serif;
                        font-size: 10px;
                        line-height: 140%;
                        text-align: center;
                        word-wrap: break-word;
                      "
                    >
                      <h2>${dd.name}</h2>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- [if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
        </div>
      </a>
    </div>
      
      `
                        )
                        .join(" ")}
        </div>
    </div>
    </div>



    `
            )
            .join(" ");

        const {
            data,
            type,
            senderEmail,
        }: { data: any; type: string; senderEmail: string; } = await request.json();
        let html = ``,
            Host_html = ``,
            title = "";
        if (type == "")
            return NextResponse.json(
                {
                    message: "Type of email not define",
                },
                {
                    status: 401,
                }
            );
        if (type.toLocaleLowerCase() == "subscribe") {
            const schema = z.object({
                name: z.string(),
                email: z.string().email(),
                phone: z
                    .string()
                    .min(10)
                    .regex(/^.*\+\d{10,15}$/, {
                        message:
                            "The phone number is not valid; a country code is required.",
                    }),
            });
            const error = schema.safeParse(data);
            if (!error.success) {
                return NextResponse.json(
                    {
                        message: "Data not valid",
                        error,
                    },
                    {
                        status: 400,
                    }
                );
            }
            title = "Subscribe to tripusers";
            Host_html = `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
          <style>
              * {
                  box-sizing: border-box;
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
              }
      
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
              }
      
              p {
                  line-height: inherit
              }
      
              .desktop_hide,
              .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
              }
      
              .image_block img+div {
                  display: none;
              }
      
              @media (max-width:520px) {
                  .desktop_hide table.icons-inner {
                      display: inline-block !important;
                  }
      
                  .icons-inner {
                      text-align: center;
                  }
      
                  .icons-inner td {
                      margin: 0 auto;
                  }
      
                  .mobile_hide {
                      display: none;
                  }
      
                  .row-content {
                      width: 100% !important;
                  }
      
                  .stack .column {
                      width: 100%;
                      display: block;
                  }
      
                  .mobile_hide {
                      min-height: 0;
                      max-height: 0;
                      max-width: 0;
                      overflow: hidden;
                      font-size: 0px;
                  }
      
                  .desktop_hide,
                  .desktop_hide table {
                      display: table !important;
                      max-height: none !important;
                  }
              }
          </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
              <tbody>
                  <tr>
                      <td>
                          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0"
                                              cellspacing="0" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;"
                                              width="500">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="image_block block-1" width="100%" border="0"
                                                              cellpadding="0" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;">
                                                                      <div class="alignment" align="center"
                                                                          style="line-height:10px">
                                                                          <div style="max-width: 460px;"><img
                                                                                  src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="460"></div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-2" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h1
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 21.599999999999998px;">
                                                                          <span class="tinyMce-placeholder">Website Enquiry -
                                                                              Subscribe&nbsp;</span>
                                                                      </h1>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-3" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-4" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Name: ${data.name}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-5" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Email: ${data.email}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-6" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Phone No.: ${data.phone}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-7" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-8" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h3
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                          <span class="tinyMce-placeholder"><a
                                                                                  href="https://www.tripusers.com/"
                                                                                  target="_blank"
                                                                                  style="text-decoration: underline; color: #7747ff;"
                                                                                  rel="noopener"><span
                                                                                      class="mce-content-body mce-edit-focus"
                                                                                      style="position: relative;"
                                                                                      id="45e66f84-2d57-4520-aae7-70e8488061c1"
                                                                                      data-position="10-0-7"
                                                                                      data-qa="tinyeditor-root-element"><span
                                                                                          class="tinyMce-placeholder">tripusers.com</span></span></a></span>
                                                                      </h3>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
      
                      </td>
                  </tr>
              </tbody>
          </table><!-- End -->
      </body>
      
      </html>`;
            html = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      
      <body>
          <!-- [if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]--> <!-- [if !mso]><!--> <!--<![endif]-->
          <style>
          a,
          a[href],
          .ii a[href]
            a:hover,
            a:focus,
            a:active {
              text-decoration: none !important;
              color: inherit;
            }
              @media only screen and (min-width: 620px) {
                  .u-row {
                      width: 600px !important;
                  }
      
                  .u-row .u-col {
                      vertical-align: top;
                  }
      
                  .u-row .u-col-33p33 {
                      width: 199.98px !important;
                  }
      
                  .u-row .u-col-50 {
                      width: 300px !important;
                  }
      
                  .u-row .u-col-66p67 {
                      width: 400.02px !important;
                  }
      
                  .u-row .u-col-100 {
                      width: 600px !important;
                  }
              }
      
              @media (max-width: 620px) {
                  .u-row-container {
                      max-width: 100% !important;
                      padding-left: 0px !important;
                      padding-right: 0px !important;
                  }
      
                  .u-row .u-col {
                      min-width: 320px !important;
                      max-width: 100% !important;
                      display: block !important;
                  }
      
                  .u-row {
                      width: 100% !important;
                  }
      
                  .u-col {
                      width: 100% !important;
                  }
      
                  .u-col>div {
                      margin: 0 auto;
                  }
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              h3 {
                  margin: 0;
              }
      
              table,
              tr,
              td {
                  vertical-align: top;
                  border-collapse: collapse;
              }
      
              p {
                  margin: 0;
              }
      
              .ie-container table,
              .mso-container table {
                  table-layout: fixed;
              }
      
              * {
                  line-height: inherit;
              }
      
              a[x-apple-data-detectors='true'] {
                  color: inherit !important;
                  text-decoration: none !important;
              }
      
              table,
              td {
                  color: #000000;
              }
      
              #u_body a {
                  color: #e81d23;
                  text-decoration: underline;
                  text-decoration-color: #000000;
              }
      
              @media (max-width: 480px) {
                  #u_content_image_3 .v-src-width {
                      width: auto !important;
                  }
      
                  #u_content_image_3 .v-src-max-width {
                      max-width: 30% !important;
                  }
              }
          </style>
          <!-- [if IE]><div class="ie-container"><![endif]--> <!-- [if mso]><div class="mso-container"><![endif]-->
          <table id="u_body"
              style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f4f4f4; width: 100%;"
              cellspacing="0" cellpadding="0">
              <tbody>
                  <tr style="vertical-align: top;">
                      <td style="word-break: break-word; border-collapse: collapse !important; vertical-align: top;">
                          <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f4f4f4;"><![endif]-->
                          <div class="u-row-container" style="padding: 20px 0 0 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 10px 10px 0 0; -webkit-border-radius: 10px 10px 0 0; -moz-border-radius: 10px 10px 0 0;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 0 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="left">
                                                                                  <a href="https://www.tripusers.com/"
                                                                                      target="_blank" rel="noopener">
                                                                                      <img class="v-src-width v-src-max-width"
                                                                                          style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 28%; max-width: 162.4px;"
                                                                                          title=""
                                                                                          src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                          alt="" width="162.4" align="left"
                                                                                          border="0">
                                                                                  </a>
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; ">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="400" style="background-color: #ffffff;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-66p67"
                                          style="max-width: 320px; min-width: 400px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: 400; line-height: 80%; text-align: left; word-wrap: break-word;">
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <p style="line-height: 80%;margin:0;">Hello, ${error.data.name}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 0px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 26px; font-weight: bold; color: #000000; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 120%;margin:0;">Thank you for
                                                                          subscribing Tripusers.com!</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 130%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 130%;margin:0;">We all at
                                                                          Tripusers will be glad to take you and Your Lovely
                                                                          family for holidays. Our Travel Experts will contact
                                                                          you very
                                                                          soon for the same.</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-33p33"
                                          style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table id="u_content_image_3"
                                                      style="font-family: arial,helvetica,sans-serif;background-color:#ffffff;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 50px 0px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="center">
                                                                                  <img class="v-src-width v-src-max-width"
                                                                                      style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 40%; max-width: 80px;"
                                                                                      title=""
                                                                                      src="https://i.postimg.cc/0NNq7K9n/travel-anim-loop.gif"
                                                                                      alt="" width="64" align="center"
                                                                                      border="0">
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 5px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: bold; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <h3 style="margin:0;">Contact Details</h3>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Name: ${error.data.name}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Email: ${error.data.email}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
      
      
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Mobile No.: ${error.data.phone}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
      
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #f79f1e;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important;padding: 10px;box-sizing: border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="background-color: #f79f1e;box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px;background-image: url(https://i.postimg.cc/pXykgjmr/TU-Email-07.png);background-size: contain;background-repeat: no-repeat;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 0px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 20px;margin: 0;">Our
                                                                      trips have
                                                                      touched hearts
                                                                      <br>globally
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">
                                                                      24,000+</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">Happy
                                                                      Guests
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">10,000+
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 20px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">No. of
                                                                      tours
                                                                      completed</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style=" font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="left">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.tripusers.com/testimonials" style="height:37px; v-text-anchor:middle; width:125px;" arcsize="11%"  stroke="f" fillcolor="#e81d23"><w:anchorlock/><center style="color:#ffffff;"><![endif]-->
                                                                      <a href="https://www.tripusers.com/testimonials"
                                                                          target="_blank" class="v-button"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #e81d23; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;margin: 0 0 0 20px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">Read
                                                                              reviews</span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 17px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 18px; font-weight: 400;">
                                                                      ⚡Trending tours</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          ${trandHtml}
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 5px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 5px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="center">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:108px;" arcsize="11%"  stroke="f" fillcolor="#f79f1e"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                      <a target="_blank" class="v-button"
                                                                          href="https://www.tripusers.com/international/trending"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #f79f1e; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">
                                                                              <span style="line-height: 16.8px;">View
                                                                                  Tours</span>
                                                                          </span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%; ;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 10px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 10px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 2px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h4
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 14px; font-weight: 400;">
                                                                      &nbsp;</h4>
                                                                  <h3 style="margin:0;">Need to talk to us?</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 4px 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 140%;margin:0;">Request a quote,
                                                                          or just
                                                                          chat
                                                                          about your next vacation. We're always happy to
                                                                          help!
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0 0 20px 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #181818;border-radius: 0 0 10px 10px;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/mPcCPnW6/call-yellow-2x.png"
                                                                      style="width: 15px;height: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818;" target="_blank" href="tel:+91 8888800696"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">+91
                                                                                  88888
                                                                                  00696</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/75p70NxP/mail-yellow-2x.png"
                                                                      style="width: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818" target="_blank" href="mailto:info@tripusers.com"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">info@tripusers.com</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <!-- [if (mso)|(IE)]></td></tr></table><![endif]-->
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- [if mso]></div><![endif]--> <!-- [if IE]></div><![endif]-->
      
      </body>
      
      </html>
            
            `;
        } else if (type.toLocaleLowerCase() == "contact") {
            const schema = z.object({
                name: z.string(),
                email: z.string().email(),
                message: z.string(),
            });
            const error = schema.safeParse(data);
            if (!error.success) {
                return NextResponse.json(
                    {
                        message: "Data not valid",
                        error,
                    },
                    {
                        status: 400,
                    }
                );
            }
            title = "Contact to tripusers";
            Host_html = `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
          <style>
              * {
                  box-sizing: border-box;
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
              }
      
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
              }
      
              p {
                  line-height: inherit
              }
      
              .desktop_hide,
              .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
              }
      
              .image_block img+div {
                  display: none;
              }
      
              @media (max-width:520px) {
                  .desktop_hide table.icons-inner {
                      display: inline-block !important;
                  }
      
                  .icons-inner {
                      text-align: center;
                  }
      
                  .icons-inner td {
                      margin: 0 auto;
                  }
      
                  .mobile_hide {
                      display: none;
                  }
      
                  .row-content {
                      width: 100% !important;
                  }
      
                  .stack .column {
                      width: 100%;
                      display: block;
                  }
      
                  .mobile_hide {
                      min-height: 0;
                      max-height: 0;
                      max-width: 0;
                      overflow: hidden;
                      font-size: 0px;
                  }
      
                  .desktop_hide,
                  .desktop_hide table {
                      display: table !important;
                      max-height: none !important;
                  }
              }
          </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
              <tbody>
                  <tr>
                      <td>
                          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0"
                                              cellspacing="0" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;"
                                              width="500">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="image_block block-1" width="100%" border="0"
                                                              cellpadding="0" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;">
                                                                      <div class="alignment" align="center"
                                                                          style="line-height:10px">
                                                                          <div style="max-width: 460px;"><img
                                                                                  src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="460"></div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-2" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h1
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 21.599999999999998px;">
                                                                          <span class="tinyMce-placeholder">Website Enquiry -
                                                                              Contact </span>
                                                                      </h1>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-3" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-4" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Name: ${data.name}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-5" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Email: ${data.email}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-6" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Message: ${data.message}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-7" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-8" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h3
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                          <span class="tinyMce-placeholder"><a
                                                                                  href="https://www.tripusers.com/"
                                                                                  target="_blank"
                                                                                  style="text-decoration: underline; color: #7747ff;"
                                                                                  rel="noopener"><span
                                                                                      class="mce-content-body mce-edit-focus"
                                                                                      style="position: relative;"
                                                                                      id="45e66f84-2d57-4520-aae7-70e8488061c1"
                                                                                      data-position="10-0-7"
                                                                                      data-qa="tinyeditor-root-element"><span
                                                                                          class="tinyMce-placeholder">tripusers.com</span></span></a></span>
                                                                      </h3>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
      
                      </td>
                  </tr>
              </tbody>
          </table><!-- End -->
      </body>
      
      </html>`;
            html = `
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- [if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> <!-- [if !mso]><!--> <!--<![endif]-->
    <style>
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-33p33 {
                width: 199.98px !important;
            }

            .u-row .u-col-50 {
                width: 300px !important;
            }

            .u-row .u-col-66p67 {
                width: 400.02px !important;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }
        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        h3 {
            margin: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        table,
        td {
            color: #000000;
        }

        #u_body a {
            color: #e81d23;
            text-decoration: underline;
            text-decoration-color: #000000;
        }

        @media (max-width: 480px) {
            #u_content_image_3 .v-src-width {
                width: auto !important;
            }

            #u_content_image_3 .v-src-max-width {
                max-width: 30% !important;
            }
        }
    </style>
    <!-- [if IE]><div class="ie-container"><![endif]--> <!-- [if mso]><div class="mso-container"><![endif]-->
    <table id="u_body"
        style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f4f4f4; width: 100%;"
        cellspacing="0" cellpadding="0">
        <tbody>
            <tr style="vertical-align: top;">
                <td style="word-break: break-word; border-collapse: collapse !important; vertical-align: top;">
                    <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f4f4f4;"><![endif]-->
                    <div class="u-row-container" style="padding: 20px 0 0 0; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div style="border-collapse: collapse; display: table; width: 100%; height: 100%;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 10px 10px 0 0; -webkit-border-radius: 10px 10px 0 0; -moz-border-radius: 10px 10px 0 0;padding:0 20px;box-sizing:border-box;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 0 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table border="0" width="100%" cellspacing="0"
                                                                cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-right: 0px; padding-left: 0px;"
                                                                            align="left">
                                                                            <a href="https://www.tripusers.com/"
                                                                                target="_blank" rel="noopener">
                                                                                <img class="v-src-width v-src-max-width"
                                                                                    style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 28%; max-width: 162.4px;"
                                                                                    title=""
                                                                                    src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                    alt="" width="162.4" align="left"
                                                                                    border="0">
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table
                                                                style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr style="vertical-align: top;">
                                                                        <td
                                                                            style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                            &nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; ">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="400" style="background-color: #ffffff;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-66p67"
                                    style="max-width: 320px; min-width: 400px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: 400; line-height: 80%; text-align: left; word-wrap: break-word;">
                                                                <!-- Dynamic Content -->
                                                                <!-- Dynamic Content -->
                                                                <!-- Dynamic Content -->
                                                                <p style="line-height: 80%;margin:0;">Hello, ${error.data.name}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 0px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="font-family: helvetica,sans-serif; font-size: 26px; font-weight: bold; color: #000000; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="line-height: 120%;margin:0;">Thank you for
                                                                    contacting Tripusers.com!</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 130%; text-align: left; word-wrap: break-word;">
                                                                <p style="line-height: 130%;margin:0;">We all at
                                                                    Tripusers will be glad to take you and Your Lovely
                                                                    family for holidays. Our Travel Experts will contact
                                                                    you very
                                                                    soon for the same.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table id="u_content_image_3"
                                                style="font-family: arial,helvetica,sans-serif;background-color:#ffffff;"
                                                role="presentation" border="0" width="100%" cellspacing="0"
                                                cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 50px 0px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table border="0" width="100%" cellspacing="0"
                                                                cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-right: 0px; padding-left: 0px;"
                                                                            align="center">
                                                                            <img class="v-src-width v-src-max-width"
                                                                                style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 40%; max-width: 80px;"
                                                                                title=""
                                                                                src="https://i.postimg.cc/0NNq7K9n/travel-anim-loop.gif"
                                                                                alt="" width="64" align="center"
                                                                                border="0">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;box-sizing:border-box;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 5px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: bold; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <h3 style="margin:0;">Contact Details</h3>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table
                                                                style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr style="vertical-align: top;">
                                                                        <td
                                                                            style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                            &nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <h1
                                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                Name: ${error.data.name}</h1>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <h1
                                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                Email: ${error.data.email}</h1>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <!-- Dynamic Content -->
                                                            <h1
                                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                Message: ${error.data.message}</h1>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #f79f1e;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important;padding: 10px;box-sizing: border-box;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="background-color: #f79f1e;box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px;background-image: url(https://i.postimg.cc/pXykgjmr/TU-Email-07.png);background-size: contain;background-repeat: no-repeat;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 0px 30px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->

                                                            <h3 style="color: #ffffff;font-size: 20px;margin: 0;">Our
                                                                trips have
                                                                touched hearts
                                                                <br>globally
                                                            </h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->

                                                            <h3 style="color: #ffffff;font-size: 18px;margin:0;">
                                                                24,000+</h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->

                                                            <h3 style="font-size: 12px;color: #ffffff;margin:0;">Happy
                                                                Guests
                                                            </h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->

                                                            <h3 style="color: #ffffff;font-size: 18px;margin:0;">10,000+
                                                            </h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 20px 30px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->

                                                            <h3 style="font-size: 12px;color: #ffffff;margin:0;">No. of
                                                                tours
                                                                completed</h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style=" font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                            <div align="left">
                                                                <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.tripusers.com/testimonials" style="height:37px; v-text-anchor:middle; width:125px;" arcsize="11%"  stroke="f" fillcolor="#e81d23"><w:anchorlock/><center style="color:#ffffff;"><![endif]-->
                                                                <a href="https://www.tripusers.com/testimonials"
                                                                    target="_blank" class="v-button"
                                                                    style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #e81d23; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;margin: 0 0 0 20px;"
                                                                    rel="noopener">
                                                                    <span
                                                                        style="display: block; padding: 10px 20px; line-height: 120%;">Read
                                                                        reviews</span>
                                                                </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 17px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <table
                                                                style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr style="vertical-align: top;">
                                                                        <td
                                                                            style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                            &nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                            <h1
                                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 18px; font-weight: 400;">
                                                                ⚡Trending tours</h1>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    ${trandHtml}
                    <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 5px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 5px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                            <div align="center">
                                                                <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:108px;" arcsize="11%"  stroke="f" fillcolor="#f79f1e"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                <a target="_blank" class="v-button"
                                                                    href="https://www.tripusers.com/international/trending"
                                                                    style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #f79f1e; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;"
                                                                    rel="noopener">
                                                                    <span
                                                                        style="display: block; padding: 10px 20px; line-height: 120%;">
                                                                        <span style="line-height: 16.8px;">View
                                                                            Tours</span>
                                                                    </span>
                                                                </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                            <div style="border-collapse: collapse; display: table; width: 100%; height: 100%; ;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 10px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                    <div
                                        style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 10px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 2px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                            <h4
                                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 14px; font-weight: 400;">
                                                                &nbsp;</h4>
                                                            <h3 style="margin:0;">Need to talk to us?</h3>
                                                            <!-- [if mso]></td></tr></table><![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                border="0" width="100%" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 4px 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div
                                                                style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="line-height: 140%;margin:0;">Request a quote,
                                                                    or just
                                                                    chat
                                                                    about your next vacation. We're always happy to
                                                                    help!
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div class="u-row-container" style="padding: 0 0 20px 0; background-color: transparent;">
                        <div class="u-row"
                            style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #181818;border-radius: 0 0 10px 10px;">
                            <div
                                style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                    <div
                                        style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                role="presentation" border="0" width="100%" cellspacing="0"
                                                cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div>
                                                                <p style="margin:0;color: #ffffff;"><img alt=""
                                                                src="https://i.postimg.cc/mPcCPnW6/call-yellow-2x.png"
                                                                style="width: 15px;height: 15px;margin-bottom: -2px;" />
                                                                    <a style="color:white;text-decoration-color: #181818;" target="_blank" href="tel:+91 8888800696"
                                                                        rel="noopener">
                                                                        <strong
                                                                            style="color:white;text-decoration-color: #000000;">+91
                                                                            88888
                                                                            00696</strong>
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                    <div
                                        style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                        <!-- [if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                            <!--<![endif]-->
                                            <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                role="presentation" border="0" width="100%" cellspacing="0"
                                                cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                            align="left">
                                                            <div>
                                                                <p style="margin:0;color: #ffffff;"><img alt=""
                                                                src="https://i.postimg.cc/75p70NxP/mail-yellow-2x.png"
                                                                style="width: 15px;margin-bottom: -2px;" />
                                                                    <a style="color:white;text-decoration-color: #181818;" target="_blank" href="mailto:info@tripusers.com"
                                                                        rel="noopener">
                                                                        <strong
                                                                            style="color:white;text-decoration-color: #000000;">info@tripusers.com</strong>
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- [if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!-- [if (mso)|(IE)]></td><![endif]-->
                                <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <!-- [if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!-- [if mso]></div><![endif]--> <!-- [if IE]></div><![endif]-->

</body>

</html>
      `;
        } else if (type.toLocaleLowerCase() == "customizeyourtrip") {
            const schema = z.object({
                name: z.string().min(1),
                email: z.string().email(),
                phone: z
                    .string()
                    .min(10)
                    .regex(/^.*\+\d{10,15}$/, {
                        message:
                            "The phone number is not valid; a country code is required.",
                    }),
                date: z.string(),
                guest: z.string().min(0),
                message: z.string().min(1),
            });
            const error = schema.safeParse(data);
            if (!error.success) {
                return NextResponse.json(
                    {
                        message: "Data not valid",
                        error,
                    },
                    {
                        status: 400,
                    }
                );
            }
            title = "Trip plan to tripusers";
            Host_html = `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
          <style>
              * {
                  box-sizing: border-box;
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
              }
      
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
              }
      
              p {
                  line-height: inherit
              }
      
              .desktop_hide,
              .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
              }
      
              .image_block img+div {
                  display: none;
              }
      
              @media (max-width:520px) {
                  .desktop_hide table.icons-inner {
                      display: inline-block !important;
                  }
      
                  .icons-inner {
                      text-align: center;
                  }
      
                  .icons-inner td {
                      margin: 0 auto;
                  }
      
                  .mobile_hide {
                      display: none;
                  }
      
                  .row-content {
                      width: 100% !important;
                  }
      
                  .stack .column {
                      width: 100%;
                      display: block;
                  }
      
                  .mobile_hide {
                      min-height: 0;
                      max-height: 0;
                      max-width: 0;
                      overflow: hidden;
                      font-size: 0px;
                  }
      
                  .desktop_hide,
                  .desktop_hide table {
                      display: table !important;
                      max-height: none !important;
                  }
              }
          </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
              <tbody>
                  <tr>
                      <td>
                          <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                              role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                  <tr>
                                      <td>
                                          <table class="row-content stack" align="center" border="0" cellpadding="0"
                                              cellspacing="0" role="presentation"
                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;"
                                              width="500">
                                              <tbody>
                                                  <tr>
                                                      <td class="column column-1" width="100%"
                                                          style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                          <table class="image_block block-1" width="100%" border="0"
                                                              cellpadding="0" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad" style="width:100%;">
                                                                      <div class="alignment" align="center"
                                                                          style="line-height:10px">
                                                                          <div style="max-width: 460px;"><img
                                                                                  src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                  style="display: block; height: auto; border: 0; width: 100%;"
                                                                                  width="460"></div>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-2" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h1
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 21.599999999999998px;">
                                                                          <span class="tinyMce-placeholder">Website Enquiry -
                                                                              Customize your trip</span>
                                                                      </h1>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-3" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-4" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Name: ${data.name}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-5" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Email: ${data.email}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-6" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Phone No.: ${data.phone}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-7" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Travel Date.: ${data.date}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="paragraph_block block-8" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div
                                                                          style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                          <p style="margin: 0;">Tell us where you would like
                                                                              to go?: ${data.message}</p>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="divider_block block-9" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <div class="alignment" align="center">
                                                                          <table border="0" cellpadding="0" cellspacing="0"
                                                                              role="presentation" width="100%"
                                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                              <tr>
                                                                                  <td class="divider_inner"
                                                                                      style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                      <span>&#8202;</span>
                                                                                  </td>
                                                                              </tr>
                                                                          </table>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                          <table class="heading_block block-10" width="100%" border="0"
                                                              cellpadding="10" cellspacing="0" role="presentation"
                                                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                              <tr>
                                                                  <td class="pad">
                                                                      <h3
                                                                          style="margin: 0; color: #000000; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                          <span class="tinyMce-placeholder"><a
                                                                                  href="https://www.tripusers.com/"
                                                                                  target="_blank"
                                                                                  style="text-decoration: underline; color: #7747ff;"
                                                                                  rel="noopener"><span
                                                                                      class="mce-content-body mce-edit-focus"
                                                                                      style="position: relative;"
                                                                                      id="45e66f84-2d57-4520-aae7-70e8488061c1"
                                                                                      data-position="10-0-7"
                                                                                      data-qa="tinyeditor-root-element"><span
                                                                                          class="tinyMce-placeholder">tripusers.com</span></span></a></span>
                                                                      </h3>
                                                                  </td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
      
                      </td>
                  </tr>
              </tbody>
          </table><!-- End -->
      </body>
      
      </html>`;
            html = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      
      <body>
          <!-- [if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]--> <!-- [if !mso]><!--> <!--<![endif]-->
          <style>
              @media only screen and (min-width: 620px) {
                  .u-row {
                      width: 600px !important;
                  }
      
                  .u-row .u-col {
                      vertical-align: top;
                  }
      
                  .u-row .u-col-33p33 {
                      width: 199.98px !important;
                  }
      
                  .u-row .u-col-50 {
                      width: 300px !important;
                  }
      
                  .u-row .u-col-66p67 {
                      width: 400.02px !important;
                  }
      
                  .u-row .u-col-100 {
                      width: 600px !important;
                  }
              }
      
              @media (max-width: 620px) {
                  .u-row-container {
                      max-width: 100% !important;
                      padding-left: 0px !important;
                      padding-right: 0px !important;
                  }
      
                  .u-row .u-col {
                      min-width: 320px !important;
                      max-width: 100% !important;
                      display: block !important;
                  }
      
                  .u-row {
                      width: 100% !important;
                  }
      
                  .u-col {
                      width: 100% !important;
                  }
      
                  .u-col>div {
                      margin: 0 auto;
                  }
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              h3 {
                  margin: 0;
              }
      
              table,
              tr,
              td {
                  vertical-align: top;
                  border-collapse: collapse;
              }
      
              p {
                  margin: 0;
              }
      
              .ie-container table,
              .mso-container table {
                  table-layout: fixed;
              }
      
              * {
                  line-height: inherit;
              }
      
              a[x-apple-data-detectors='true'] {
                  color: inherit !important;
                  text-decoration: none !important;
              }
      
              table,
              td {
                  color: #000000;
              }
      
              #u_body a {
                  color: #e81d23;
                  text-decoration: underline;
                  text-decoration-color: #000000;
              }
      
              @media (max-width: 480px) {
                  #u_content_image_3 .v-src-width {
                      width: auto !important;
                  }
      
                  #u_content_image_3 .v-src-max-width {
                      max-width: 30% !important;
                  }
              }
          </style>
          <!-- [if IE]><div class="ie-container"><![endif]--> <!-- [if mso]><div class="mso-container"><![endif]-->
          <table id="u_body"
              style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f4f4f4; width: 100%;"
              cellspacing="0" cellpadding="0">
              <tbody>
                  <tr style="vertical-align: top;">
                      <td style="word-break: break-word; border-collapse: collapse !important; vertical-align: top;">
                          <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f4f4f4;"><![endif]-->
                          <div class="u-row-container" style="padding: 20px 0 0 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 10px 10px 0 0; -webkit-border-radius: 10px 10px 0 0; -moz-border-radius: 10px 10px 0 0;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 0 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="left">
                                                                                  <a href="https://www.tripusers.com/"
                                                                                      target="_blank" rel="noopener">
                                                                                      <img class="v-src-width v-src-max-width"
                                                                                          style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 28%; max-width: 162.4px;"
                                                                                          title=""
                                                                                          src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                          alt="" width="162.4" align="left"
                                                                                          border="0">
                                                                                  </a>
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; ">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="400" style="background-color: #ffffff;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-66p67"
                                          style="max-width: 320px; min-width: 400px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: 400; line-height: 80%; text-align: left; word-wrap: break-word;">
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <p style="line-height: 80%;margin:0;">Hello,${error.data.name}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 0px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 26px; font-weight: bold; color: #000000; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 120%;margin:0;">Thank you for
                                                                          enquiring
                                                                          with
                                                                          Tripusers.com!</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 130%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 130%;margin:0;">We all at
                                                                          Tripusers will be glad to take you and Your Lovely
                                                                          family for holidays. Our Travel Experts will contact
                                                                          you very
                                                                          soon for the same.</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-33p33"
                                          style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table id="u_content_image_3"
                                                      style="font-family: arial,helvetica,sans-serif;background-color:#ffffff;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 50px 0px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="center">
                                                                                  <img class="v-src-width v-src-max-width"
                                                                                      style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 40%; max-width: 80px;"
                                                                                      title=""
                                                                                      src="https://i.postimg.cc/0NNq7K9n/travel-anim-loop.gif"
                                                                                      alt="" width="64" align="center"
                                                                                      border="0">
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 5px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: bold; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <h3 style="margin:0;">Guest Details</h3>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Name: ${error.data.name}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Email: ${error.data.email}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Mobile No: ${error.data.phone}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Travel Date: ${error.data.date}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      No. of Guests: ${error.data.guest}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Message: ${error.data.message}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #f79f1e;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important;padding: 10px;box-sizing: border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="background-color: #f79f1e;box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px;background-image: url(https://i.postimg.cc/pXykgjmr/TU-Email-07.png);background-size: contain;background-repeat: no-repeat;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 0px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 20px;margin: 0;">Our
                                                                      trips have
                                                                      touched hearts
                                                                      <br>globally
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">
                                                                      24,000+</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">Happy
                                                                      Guests
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">10,000+
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 20px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">No. of
                                                                      tours
                                                                      completed</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style=" font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="left">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.tripusers.com/testimonials" style="height:37px; v-text-anchor:middle; width:125px;" arcsize="11%"  stroke="f" fillcolor="#e81d23"><w:anchorlock/><center style="color:#ffffff;"><![endif]-->
                                                                      <a href="https://www.tripusers.com/testimonials"
                                                                          target="_blank" class="v-button"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #e81d23; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;margin: 0 0 0 20px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">Read
                                                                              reviews</span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 17px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 18px; font-weight: 400;">
                                                                      ⚡Trending tours</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          ${trandHtml}
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 5px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 5px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="center">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:108px;" arcsize="11%"  stroke="f" fillcolor="#f79f1e"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                      <a target="_blank" class="v-button"
                                                                          href="https://www.tripusers.com/international/trending"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #f79f1e; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">
                                                                              <span style="line-height: 16.8px;">View
                                                                                  Tours</span>
                                                                          </span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%; ;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 10px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 10px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 2px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h4
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 14px; font-weight: 400;">
                                                                      &nbsp;</h4>
                                                                  <h3 style="margin:0;">Need to talk to us?</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 4px 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 140%;margin:0;">Request a quote,
                                                                          or just
                                                                          chat
                                                                          about your next vacation. We're always happy to
                                                                          help!
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0 0 20px 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #181818;border-radius: 0 0 10px 10px;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/mPcCPnW6/call-yellow-2x.png"
                                                                      style="width: 15px;height: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818;" target="_blank" href="tel:+91 8888800696"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">+91
                                                                                  88888
                                                                                  00696</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/75p70NxP/mail-yellow-2x.png"
                                                                      style="width: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818;" target="_blank" href="mailto:info@tripusers.com"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">info@tripusers.com</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <!-- [if (mso)|(IE)]></td></tr></table><![endif]-->
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- [if mso]></div><![endif]--> <!-- [if IE]></div><![endif]-->
      
      </body>
      
      </html>
            
            `;
        } else if (type.toLocaleLowerCase() == "package") {
            const schema = z.object({
                packageName: z.string(),
                adult: z.string().min(0),
                child: z.string().min(0),
                travelDate: z.string().min(0),
                name: z.string(),
                email: z.string(),
                mobile: z
                    .string()
                    .min(10)
                    .regex(/^.*\+\d{10,15}$/, {
                        message:
                            "The phone number is not valid; a country code is required.",
                    }),
            });
            const error = schema.safeParse(data);
            if (!error.success) {
                return NextResponse.json(
                    {
                        message: "Data not valid",
                        error,
                    },
                    {
                        status: 400,
                    }
                );
            }
            title = "Select package";
            Host_html = `
      <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        @media (max-width:520px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;"
                                        width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 460px;"><img
                                                                            src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="460"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-2" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h1
                                                                    style="margin: 0; color: #000000; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 21.599999999999998px;">
                                                                    <span class="tinyMce-placeholder">Website Enquiry -
                                                                        Package </span>
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation" width="100%"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                <span>&#8202;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Package Name: ${data.packageName}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-5" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Adults: ${data.adult}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-6" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Children: ${data.child}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-7" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Travel Date.: ${data.travelDate}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-8" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Name: ${data.name}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-9" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Email: ${data.email}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-10" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;">Phone No.: ${data.mobile}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-11" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation" width="100%"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                <span>&#8202;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-12" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h3
                                                                    style="margin: 0; color: #000000; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 14.399999999999999px;">
                                                                    <span class="tinyMce-placeholder"><a
                                                                            href="https://www.tripusers.com/"
                                                                            target="_blank"
                                                                            style="text-decoration: underline; color: #7747ff;"
                                                                            rel="noopener"><span
                                                                                class="mce-content-body mce-edit-focus"
                                                                                style="position: relative;"
                                                                                id="45e66f84-2d57-4520-aae7-70e8488061c1"
                                                                                data-position="10-0-7"
                                                                                data-qa="tinyeditor-root-element"><span
                                                                                    class="tinyMce-placeholder">tripusers.com</span></span></a></span>
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>`;
            html = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      
      <body>
          <!-- [if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]--> <!-- [if !mso]><!--> <!--<![endif]-->
          <style>
              @media only screen and (min-width: 620px) {
                  .u-row {
                      width: 600px !important;
                  }
      
                  .u-row .u-col {
                      vertical-align: top;
                  }
      
                  .u-row .u-col-33p33 {
                      width: 199.98px !important;
                  }
      
                  .u-row .u-col-50 {
                      width: 300px !important;
                  }
      
                  .u-row .u-col-66p67 {
                      width: 400.02px !important;
                  }
      
                  .u-row .u-col-100 {
                      width: 600px !important;
                  }
              }
      
              @media (max-width: 620px) {
                  .u-row-container {
                      max-width: 100% !important;
                      padding-left: 0px !important;
                      padding-right: 0px !important;
                  }
      
                  .u-row .u-col {
                      min-width: 320px !important;
                      max-width: 100% !important;
                      display: block !important;
                  }
      
                  .u-row {
                      width: 100% !important;
                  }
      
                  .u-col {
                      width: 100% !important;
                  }
      
                  .u-col>div {
                      margin: 0 auto;
                  }
              }
      
              body {
                  margin: 0;
                  padding: 0;
              }
      
              h3 {
                  margin: 0;
              }
      
              table,
              tr,
              td {
                  vertical-align: top;
                  border-collapse: collapse;
              }
      
              p {
                  margin: 0;
              }
      
              .ie-container table,
              .mso-container table {
                  table-layout: fixed;
              }
      
              * {
                  line-height: inherit;
              }
      
              a[x-apple-data-detectors='true'] {
                  color: inherit !important;
                  text-decoration: none !important;
              }
      
              table,
              td {
                  color: #000000;
              }
      
              #u_body a {
                  color: #e81d23;
                  text-decoration: underline;
                  text-decoration-color: #000000;
              }
      
              @media (max-width: 480px) {
                  #u_content_image_3 .v-src-width {
                      width: auto !important;
                  }
      
                  #u_content_image_3 .v-src-max-width {
                      max-width: 30% !important;
                  }
              }
          </style>
          <!-- [if IE]><div class="ie-container"><![endif]--> <!-- [if mso]><div class="mso-container"><![endif]-->
          <table id="u_body"
              style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #f4f4f4; width: 100%;"
              cellspacing="0" cellpadding="0">
              <tbody>
                  <tr style="vertical-align: top;">
                      <td style="word-break: break-word; border-collapse: collapse !important; vertical-align: top;">
                          <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f4f4f4;"><![endif]-->
                          <div class="u-row-container" style="padding: 20px 0 0 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 10px 10px 0 0; -webkit-border-radius: 10px 10px 0 0; -moz-border-radius: 10px 10px 0 0;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 0 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="left">
                                                                                  <a href="https://www.tripusers.com/"
                                                                                      target="_blank" rel="noopener">
                                                                                      <img class="v-src-width v-src-max-width"
                                                                                          style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 28%; max-width: 162.4px;"
                                                                                          title=""
                                                                                          src="https://i.postimg.cc/0jpHQX8M/Asset-1-2x.png"
                                                                                          alt="" width="162.4" align="left"
                                                                                          border="0">
                                                                                  </a>
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; ">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="400" style="background-color: #ffffff;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-66p67"
                                          style="max-width: 320px; min-width: 400px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: 400; line-height: 80%; text-align: left; word-wrap: break-word;">
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <!-- Dynamic Content -->
                                                                      <p style="line-height: 80%;margin:0;">Hello, ${error.data.name}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 0px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 26px; font-weight: bold; color: #000000; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 120%;margin:0;">Thank you for
                                                                          enquiring
                                                                          with
                                                                          Tripusers.com!</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 130%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 130%;margin:0;">We all at
                                                                          Tripusers will be glad to take you and Your Lovely
                                                                          family for holidays. Our Travel Experts will contact
                                                                          you very
                                                                          soon for the same.</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-33p33"
                                          style="max-width: 320px; min-width: 200px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table id="u_content_image_3"
                                                      style="font-family: arial,helvetica,sans-serif;background-color:#ffffff;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 50px 0px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table border="0" width="100%" cellspacing="0"
                                                                      cellpadding="0">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td style="padding-right: 0px; padding-left: 0px;"
                                                                                  align="center">
                                                                                  <img class="v-src-width v-src-max-width"
                                                                                      style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 40%; max-width: 80px;"
                                                                                      title=""
                                                                                      src="https://i.postimg.cc/0NNq7K9n/travel-anim-loop.gif"
                                                                                      alt="" width="64" align="center"
                                                                                      border="0">
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding:0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 5px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 16px; font-weight: bold; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <h3 style="margin:0;">Guest Details</h3>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 1px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Name: ${error.data.name}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Email: ${error.data.email}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Mobile No: ${error.data.mobile}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Travel Date: ${error.data.travelDate}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Adults: ${error.data.adult}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Children: ${error.data.child}</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 8px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <!-- Dynamic Content -->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 14px; font-weight: 400;">
                                                                      Package Name: ${error.data.packageName}
                                                                  </h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #f79f1e;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important;padding: 10px;box-sizing: border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="background-color: #f79f1e;box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px;background-image: url(https://i.postimg.cc/pXykgjmr/TU-Email-07.png);background-size: contain;background-repeat: no-repeat;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 30px 10px 0px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 20px;margin: 0;">Our
                                                                      trips have
                                                                      touched hearts
                                                                      <br>globally
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">
                                                                      24,000+</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">Happy
                                                                      Guests
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 20px 10px 2px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="color: #ffffff;font-size: 18px;margin:0;">10,000+
                                                                  </h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 2px 10px 20px 30px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
      
                                                                  <h3 style="font-size: 12px;color: #ffffff;margin:0;">No. of
                                                                      tours
                                                                      completed</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style=" font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="left">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.tripusers.com/testimonials" style="height:37px; v-text-anchor:middle; width:125px;" arcsize="11%"  stroke="f" fillcolor="#e81d23"><w:anchorlock/><center style="color:#ffffff;"><![endif]-->
                                                                      <a href="https://www.tripusers.com/testimonials"
                                                                          target="_blank" class="v-button"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #e81d23; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;margin: 0 0 0 20px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">Read
                                                                              reviews</span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 17px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <table
                                                                      style="border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px solid #BBBBBB; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
                                                                      border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                      align="center">
                                                                      <tbody>
                                                                          <tr style="vertical-align: top;">
                                                                              <td
                                                                                  style="word-break: break-word; border-collapse: collapse !important; vertical-align: top; font-size: 0px; line-height: 0px; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                                                  &nbsp;</td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h1
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 18px; font-weight: 400;">
                                                                      ⚡Trending tours</h1>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          ${trandHtml}
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 5px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 5px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                  <div align="center">
                                                                      <!-- [if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:108px;" arcsize="11%"  stroke="f" fillcolor="#f79f1e"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                      <a target="_blank" class="v-button"
                                                                          href="https://www.tripusers.com/international/trending"
                                                                          style="box-sizing: border-box; display: inline-block; text-decoration: none; -webkit-text-size-adjust: none; text-align: center; color: #ffffff; background-color: #f79f1e; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; max-width: 100%; overflow-wrap: break-word; word-break: break-word; word-wrap: break-word; mso-border-alt: none; font-size: 14px;"
                                                                          rel="noopener">
                                                                          <span
                                                                              style="display: block; padding: 10px 20px; line-height: 120%;">
                                                                              <span style="line-height: 16.8px;">View
                                                                                  Tours</span>
                                                                          </span>
                                                                      </a> <!-- [if mso]></center></v:roundrect><![endif]-->
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0px; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                                  <div style="border-collapse: collapse; display: table; width: 100%; height: 100%; ;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 10px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-100"
                                          style="max-width: 320px; min-width: 600px; display: table-cell; vertical-align: top;">
                                          <div
                                              style="background-color: #ffffff; height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;padding: 0 20px;box-sizing:border-box;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 10px 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px 10px 2px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <!-- [if mso]><table width="100%"><tr><td><![endif]-->
                                                                  <h4
                                                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: helvetica,sans-serif; font-size: 14px; font-weight: 400;">
                                                                      &nbsp;</h4>
                                                                  <h3 style="margin:0;">Need to talk to us?</h3>
                                                                  <!-- [if mso]></td></tr></table><![endif]-->
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table style="font-family: arial,helvetica,sans-serif;" role="presentation"
                                                      border="0" width="100%" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 4px 10px 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div
                                                                      style="font-family: helvetica,sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                      <p style="line-height: 140%;margin:0;">Request a quote,
                                                                          or just
                                                                          chat
                                                                          about your next vacation. We're always happy to
                                                                          help!
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <div class="u-row-container" style="padding: 0 0 20px 0; background-color: transparent;">
                              <div class="u-row"
                                  style="margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #181818;border-radius: 0 0 10px 10px;">
                                  <div
                                      style="border-collapse: collapse; display: table; width: 100%; height: 100%; background-color: transparent;">
                                      <!-- [if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/mPcCPnW6/call-yellow-2x.png"
                                                                      style="width: 15px;height: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818;" target="_blank" href="tel:+91 8888800696"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">+91
                                                                                  88888
                                                                                  00696</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                      <div class="u-col u-col-50"
                                          style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;">
                                          <div
                                              style=" height: 100%; width: 100% !important; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                              <!-- [if (!mso)&(!IE)]><!-->
                                              <div
                                                  style="box-sizing: border-box; height: 100%; padding: 0px; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; border: 0px solid transparent;padding:10px 20px 10px 20px;">
                                                  <!--<![endif]-->
                                                  <table style="font-family: arial,helvetica,sans-serif;font-size:12px;"
                                                      role="presentation" border="0" width="100%" cellspacing="0"
                                                      cellpadding="0">
                                                      <tbody>
                                                          <tr>
                                                              <td style="overflow-wrap: break-word; word-break: break-word; padding: 10px; font-family: arial,helvetica,sans-serif;"
                                                                  align="left">
                                                                  <div>
                                                                      <p style="margin:0;color: #ffffff;"><img alt=""
                                                                      src="https://i.postimg.cc/75p70NxP/mail-yellow-2x.png"
                                                                      style="width: 15px;margin-bottom: -2px;" />
                                                                          <a style="color:white;text-decoration-color: #181818;" target="_blank" href="mailto:info@tripusers.com"
                                                                              rel="noopener">
                                                                              <strong
                                                                                  style="color:white;text-decoration-color: #000000;">info@tripusers.com</strong>
                                                                          </a>
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <!-- [if (!mso)&(!IE)]><!-->
                                              </div>
                                              <!--<![endif]-->
                                          </div>
                                      </div>
                                      <!-- [if (mso)|(IE)]></td><![endif]-->
                                      <!-- [if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                              </div>
                          </div>
                          <!-- [if (mso)|(IE)]></td></tr></table><![endif]-->
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- [if mso]></div><![endif]--> <!-- [if IE]></div><![endif]-->
      
      </body>
      
      </html>
              `;
        }

        const sendToSender = await account.sendMail({
            from: process.env.EMAIL,
            to: senderEmail,
            html,
            subject: title,
        });
        const sendToSelf = await account.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            html: Host_html,
            subject: title,
        });
        return NextResponse.json({
            message: "Check your email inbox!",
            ServerMessage: {
                sendToSender: sendToSender.response,
                sendToSelf: sendToSelf.response,
            },
        });
    } catch (e: any) {
        return NextResponse.json(
            {
                message: "Internal server error",
                error: e.message,
            },
            {
                status: 500,
            }
        );
    }
}
