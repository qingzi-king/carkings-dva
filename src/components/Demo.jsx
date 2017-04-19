import React, {Component, PropTypes} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Link } from 'dva/router';
import moment from 'moment';
import _ from 'lodash';

import { Button, Spin } from 'antd';

import styles from './IndexPage.less';

// import MainLayout from '../layouts/mainLayout/MainLayout';

function Users({ location, dispatch, users, apps }) {

  function handleModifyUserName(name) {
    dispatch({
      type: 'users/edit', //users：表示models里面namespace的users，其中edit为其reducers中方法
      name: name,
    });
  }
  function handleSaveUserName(name) {
    dispatch({
      type: 'users/save',
      name: name,
    });
  }
  function handleChangeObject() {
    dispatch({
      type: 'users/objChange',
      payload: {
        numbers: 99
      }
    });
  }
  function handleChangeArray() {
    dispatch({
      type: 'users/arrChange',
      payload: {
        lists: [{name: '赵六',age: 14}]
      }
    });
  }
  function handleQuery(tempProjectId) {
    dispatch({
      type: 'users/query'
    });

    /*
    * dispatch(routerRedux.push({
    *   pathname: '/users',
    *   query: {
    *     projectId: tempProjectId
    *   }
    * }))
    * 
    * 最终的URL是/users?projectId=1
    */
  }

  return (
    <div style={{width:1024,margin:'10px auto'}}>

      <Spin spinning={users.loading} tip="Loading...">

        <Link to="/"><Button type="primary">跳转至主页</Button></Link>
        <div className={styles.ck_Lists}>
          <p>姓名1：{apps.name}</p>
          <p>年龄1：{apps.age}</p>
          <p>地址1：{apps.addr}</p>
        </div>
        <div className={styles.ck_Lists}>
          <p>姓名2：{users.name} <Button size="small" type="primary" onClick={handleModifyUserName.bind(null, '轻姿王')}>更新</Button></p>
          <p>年龄2：{users.age} <Button size="small" type="primary" onClick={handleSaveUserName.bind(null, '轻姿王')}>更新</Button></p>
          <p>地址2：{users.addr}</p>
        </div>

        <ul>
          <li style={{marginTop:15,fontWeight:600}}>
            <p>商品名称：{users.goods.name}</p>
            <p>价格：{users.goods.price}</p>
            <p>数量：{users.goods.numbers}</p>
            <p>订单：{users.goods.showTotal(12)}</p>
          </li>
          <li>
            <p>
              <Button size="small" type="primary" onClick={handleChangeObject}>变更Obj</Button>
            </p>
          </li>
        </ul>

        <ul style={{marginTop:15}}>
          {
            users.lists.map((item, key) => {
              return (
                <li key={key}>{item.name} - {item.age}</li>
              )
            })
          }
          <li>
            <Button size="small" type="primary" onClick={handleChangeArray}>变更Arr</Button>
            <Button size="small" type="primary" onClick={handleQuery.bind(null, 1)} style={{marginLeft:5}}>获取数据</Button>
          </li>
        </ul>

        {
          _.size(users.projectInfo.Users) > 0 ?
            <p>共有人员{users.projectInfo.Users.length}人</p>
          :
            null
        }

        {
          _.map(users.projectInfo.Users, (item, key) => {
            return (
              <p key={key}>{item.name}</p>
            )
          })
        }

      </Spin>
    </div>
  );
}

// Users.propTypes = {
//   users: PropTypes.object,
//   apps: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func
// }

export default connect(({users, apps}) => ({users, apps}))(Users)
