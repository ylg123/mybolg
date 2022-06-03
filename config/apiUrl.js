let ipUrl = 'http://121.5.27.145:7001/default/'

let servicePath = {
  getArticleList : ipUrl+'getArticleList/', //首页文章列表接口
  getArticleById : ipUrl+'getArticleById/', //详细页接口
  getTypeInfo : ipUrl+'getTypeInfo', //文章类别接口
  getListById : ipUrl+'getListById/' //根据类别id获取文章列表接口
}

export default servicePath