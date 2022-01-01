export function $(id) {
  return document.getElementById(id);
}

export function validURL(myURL) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(myURL);
}

export async function handleForm(){
    var url = $("article-url").value;
    if (validURL(url)) {
      console.log("valid URL", url);
      try {
        const response = await fetch("http://localhost:8081/sentiment", {
          method: "POST",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        });
        const data = await response.json();
        console.log("api response:", data);
        alert("Sentiment analysis is done successfully");
        $("agreement").innerHTML = `Agreement: ${data.agreement}`;
        $("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
        $("confidence").innerHTML = `Confidence: ${data.confidence}`;
        $("irony").innerHTML = `Irony: ${data.irony}`;
        $("score_tag").innerHTML = "Score: " + polarityChecker(data.score_tag);
      } catch (err) {
        console.log("err", err);
      }
    } else {
      console.log("invalid URL");
      alert("Invalid URL");
    }
}

const polarityChecker = (score) => {
  let pol = "Normal";
  console.log("score", score);
  switch (score) {
    case "P+":
      pol = "Very positive";
      break;
    case "P":
      pol = "Positive";
      break;
    case "NEU":
      pol = "Normal";
      break;
    case "N":
      pol = "Negative";
      break;
    case "N+":
      pol = "Very negative";
      break;
    case "NONE":
      pol = "No Sentiment score";
  }
  return pol;
};
