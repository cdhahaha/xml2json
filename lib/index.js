'use strick';

/**
 * 创建XML文档
 * @param  {String} strxml XML字符串
 * @return {Object}        文档对象
 */

var createXMLstrDoc = function createXMLstrDoc(strxml) {

  var tmpxmlStrDoc = null;

  if (window.DOMParser) {
    var parser = new DOMParser();
    tmpxmlStrDoc = parser.parseFromString(strxml, "text/xml");
  } else {
    tmpxmlStrDoc = new ActiveXObject("Microsoft.XMLDOM");
    tmpxmlStrDoc.async = "false";
    tmpxmlStrDoc.loadXML(strxml);
  }

  return tmpxmlStrDoc;
};

/**
 * 获取XML文档
 * @param  {[type]} xml [description]
 * @return {[type]}     [description]
 */
var getXML = function getXML(xml) {

  var xmlDoc,
      xmlhttp = new window.XMLHttpRequest();

  xmlhttp.open('GET', xml, true);
  xmlhttp.send(null);

  return new Promise(function (resolve, reject) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
        xmlDoc = xmlhttp.responseXML ? xmlhttp.responseXML.documentElement : createXMLstrDoc(xmlhttp.responseText).documentElement;
        if (xmlDoc) {
          resolve(xmlDoc);
        } else {
          reject(false);
        }
      }
    };
  });
};

/**
 * xml对象转换为json对象
 * @param  {String} xmlName XML文件地址
 * @return {Object}         Promise对象
 */
var xml2json = function xml2json(xmlName) {

  return new Promise(function (resolve, reject) {
    getXML(xmlName).then(function (xmlDoc) {

      var obj = {};

      function mapEle(eles) {

        var result = {};

        Array.from(eles).forEach(function (ele) {

          var eleObj = {
            attrs: {}
          };
          var attrs = ele.attributes;
          var name = ele.nodeName;

          Array.from(attrs).forEach(function (attr) {
            eleObj['attrs'][attr.nodeName] = attr.nodeValue;
          });

          if (ele.children.length > 0) {
            eleObj['children'] = mapEle(ele.children);
          }

          if (JSON.stringify(eleObj.attrs) === '{}') {
            delete eleObj.attrs;
          }

          if (result[ele.nodeName] instanceof Array) {
            result[ele.nodeName].push(eleObj);
          } else {
            result[ele.nodeName] = [];
            result[ele.nodeName].push(eleObj);
          }
        });

        return result;
      }

      obj[xmlDoc.nodeName] = mapEle(xmlDoc.children);

      if (xmlDoc) {
        resolve(obj);
      } else {
        reject(false);
      }
    }).catch(function (e) {
      console.log(e);
    });
  });
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = xml2json;
  }
}