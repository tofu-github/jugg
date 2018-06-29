package com.jugg.pm.dao;

import java.util.List;

/**
 * 基础dao，提供基本的赠删除改查模板
 */
public interface BaseDao{

    /**
     * 新增一行记录
     * @param t
     * @return
     */
    <T>T addNew(T t);

    /**
     * 根据ID查询一行记录
     * @param id
     * @return
     */
    <T>T queryById(Long id);

    /**
     * 根据条件查询集合
     * @param e
     * @param <E>
     * @return
     */
    <E, T>List<T> queryByConditions(E e);

    /**
     * 根据查询条件统计行数
     * @param e
     * @param <E>
     * @return
     */
    <E>Integer countByConditions(E e);

    /**
     * 根据ID更新
     * @param e
     * @param <E>
     * @return
     */
    <E>Integer updateById(E e);
}
