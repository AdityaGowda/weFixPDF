require("dotenv").config();
const mysql = require("mysql2/promise");

const DB_NAME = process.env.DB_NAME || "wefixpdf_db";

async function removeAdsFromSeo() {
  console.log("🚀 Starting database update to remove 'No ads' mentions...\n");

  let conn;
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER || "wefixpdf_user",
      password: process.env.DB_PASSWORD || "",
      database: DB_NAME,
      charset: "utf8mb4",
    });

    // 1. Fetch the specific row that has the 'No ads' text (slug: 'best-pdf-tools-for-privacy')
    const [rows] = await conn.query(
      `SELECT id, body_content, features, cta FROM seo_content WHERE slug = 'best-pdf-tools-for-privacy'`
    );

    if (rows.length === 0) {
      console.log("⚠️ No matching seo_content found for 'best-pdf-tools-for-privacy'. It might already be updated or missing.");
    } else {
      const row = rows[0];

      let updatedBodyContent = row.body_content;
      let updatedFeatures = row.features;
      let updatedCta = row.cta;

      // Replace in body content
      if (updatedBodyContent && updatedBodyContent.includes("No ads: weFixPDF shows no advertising.")) {
        updatedBodyContent = updatedBodyContent.replace(
          "No ads: weFixPDF shows no advertising.",
          "Fast processing: weFixPDF is optimized for speed without intrusive delays."
        );
      }

      // Replace in features JSON
      if (updatedFeatures) {
        try {
          // It might be stored as string or JSON based on DB setup (usually string from JSON.stringify if stored as TEXT, 
          // but if column type is JSON, mysql2 might return object or string)
          let featuresArr = typeof updatedFeatures === "string" ? JSON.parse(updatedFeatures) : updatedFeatures;
          const noAdsIndex = featuresArr.indexOf("No ads ever");
          if (noAdsIndex !== -1) {
            featuresArr[noAdsIndex] = "Fast processing speed";
            updatedFeatures = JSON.stringify(featuresArr);
          } else if (typeof updatedFeatures !== "string") {
             updatedFeatures = JSON.stringify(updatedFeatures);
          }
        } catch (e) {
          console.error("Error parsing features JSON", e);
        }
      }

      // Replace in CTA JSON
      if (updatedCta) {
        try {
          let ctaObj = typeof updatedCta === "string" ? JSON.parse(updatedCta) : updatedCta;
          if (ctaObj.text && ctaObj.text.includes("No Ads")) {
            ctaObj.text = ctaObj.text.replace("No Ads, ", "Free & ");
            updatedCta = JSON.stringify(ctaObj);
          } else if (typeof updatedCta !== "string") {
            updatedCta = JSON.stringify(updatedCta);
          }
        } catch (e) {
          console.error("Error parsing CTA JSON", e);
        }
      }

      console.log("Updating database record...");
      await conn.query(
        `UPDATE seo_content SET body_content = ?, features = ?, cta = ? WHERE id = ?`,
        [updatedBodyContent, updatedFeatures, updatedCta, row.id]
      );
      
      console.log("✅ Successfully updated the SEO record.");
    }
  } catch (err) {
    console.error("💥 Update failed:", err.message);
  } finally {
    if (conn) {
      await conn.end();
      console.log("\nDatabase connection closed.");
    }
  }
}

removeAdsFromSeo();
