const { Goofish } = require('goofish-client');

async function getUserDetail() {
  // 创建Client实例
  const client = new Goofish({
    cookie: 'cookie2=xxx',
  });

  try {
    // 查看自己的信息
    console.log('=== 查看自己的信息 ===');
    const myInfo = await client.api.mtop.user.getUserHead();

    if (myInfo.ret[0] === 'SUCCESS::调用成功') {
      const { module } = myInfo.data;

      console.log('我的昵称:', module.base.displayName);
      console.log('我的位置:', module.base.ipLocation);
      console.log('我的粉丝:', module.social.followers);
      console.log('我的关注:', module.social.following);
      console.log('我的商品数:', module.tabs.item.number);
    }

    // 查看他人信息
    console.log('\n=== 查看他人信息 ===');
    const otherUserInfo = await client.api.mtop.user.getUserHead({
      self: false,
      userId: '38xxxxxx950', // 目标用户ID
    });

    if (otherUserInfo.ret[0] === 'SUCCESS::调用成功') {
      const { baseInfo, module } = otherUserInfo.data;

      console.log('用户昵称:', module.base.displayName);
      console.log('用户位置:', module.base.ipLocation);
      console.log('粉丝数量:', module.social.followers);
      console.log('关注数量:', module.social.following);
      console.log(
        '关注状态:',
        module.social.followStatus === 1 ? '已关注' : '未关注'
      );
      console.log('商品数量:', module.tabs.item.number);
      console.log('评价数量:', module.tabs.rate.number);

      // 信用标签信息
      if (module.base.ylzTags && module.base.ylzTags.length > 0) {
        console.log('\n信用标签:');
        module.base.ylzTags.forEach((tag) => {
          console.log(
            `- ${tag.text} (${tag.attributes.role} 等级${tag.attributes.level})`
          );
        });
      }

      // 用户标签
      console.log('\n用户认证:');
      console.log(
        '实名认证:',
        baseInfo.tags.real_name_certification_77 ? '已认证' : '未认证'
      );
      console.log(
        '芝麻认证:',
        baseInfo.tags.idle_zhima_zheng ? '已认证' : '未认证'
      );
      console.log('用户升级:', baseInfo.tags.xianyu_user_upgrade ? '是' : '否');

      // 个人介绍
      if (module.base.introduction) {
        console.log('\n个人介绍:');
        console.log(module.base.introduction);
      }
    } else {
      console.error('获取用户信息失败:', otherUserInfo.ret);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 使用示例
getUserDetail();
