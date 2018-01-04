var cardRange = {
  "1": {
    "match": {
      "VISA": ["4"]},
    "range": {}
  },
  "2": {
    "match": {
      "AMEX": ["34", "37"],
      "UPAY": ["62", "88"],
      "DCB": ["36"],
      "DISCOVER": ["65"]},
    "range": {
      "MAST": [["50","55"]],
      "DCB": [["38","39"]]}
  },
  "3": {
    "match": {
      "DCB": ["309"]},
    "range": {
      "DCB": [["300", "305"]],
      "DISCOVER": [["644", "649"]]},
  },
  "4": {
    "match": {
      "DISCOVER": ["6011"],
      "LASER": ["6304","6706","6771","6709"],
      "MAESTRO": ["5018", "5020", "5038", "5612", "5893", "6304", "6759", "6761", "6762", "6763", "0604", "6390"],
      "DANKORT": ["5019"],
      "VELEC": ["4026", "4405", "4508", "4844", "4913", "4917"]},
      "range": {
      "JCB": [["3528", "3589"]]}
  },
  "6":  {
    "match": {
      "VELEC": ["417500"]},
    "range": {
      "DISCOVER": [["622126","622925"]]}
  }
}

export default cardRange;