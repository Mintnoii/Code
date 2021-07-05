import React from 'react';
import { Tree } from 'antd';
import { DownOutlined, TagsOutlined } from '@ant-design/icons';

const LabelTree = props => {
  const {dataSource, onSelectedLabel} = props
  const formatTreeData = (dataSource) => {
    return dataSource.map(item => {
      const {id, label, subCount, subList, type} = item
      const resData = {
        title: type === 1 ? `${label}(${subCount})` : label,
        key: `${id}`,
        type,
      }
      // 中间节点递归处理subList 叶子节点则配置icon
      if(type === 1){
        resData['children'] = formatTreeData(subList)
      }else{
        resData['switcherIcon'] = <TagsOutlined />
      }
      return resData
    })
  }

  const onSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);
    const {selected, selectedNodes} = info
    onSelectedLabel(selected,selectedNodes)
  };
  console.log(formatTreeData(dataSource),'formatTreeData(dataSource)');

  return (
    <div>
      {/* <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      /> */}
      {
        dataSource?.length > 0 ? (<Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['1', '2']}
          onSelect={onSelect}
          // titleRender={(nodeData) => renderCustomTreeNode(nodeData)}
          showIcon
          treeData={formatTreeData(dataSource)}
        />): '暂无数据～'
      }
      
    </div>
  );
};
export default LabelTree;
