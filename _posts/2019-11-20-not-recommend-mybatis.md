---
layout: article
title:  不推荐mybatis
---

我一直不赞同大规模使用mybatis的，我知道没有包打天下的框架，但是我们不能宗教的把mybatis当成成大部分项目的默认依赖
为什么国内这么流行呢？可能有人认为大厂在用啊，阿里在用啊，所以我们就用，这是一个典型没有自己独立思考的行为

持久的是什么？是公司的核心数据资产，和核心数据资产的交互组件一定要简单，可控，透明，所以我们应该始终使用弱封装框架，比如spring jdbc模板，当然还有很多其他方案

mybatis到底有什么问题？看看下面这段配置，这是开源工作流camunda的代码

```
<sql id="selectHistoricVariableInstanceByQueryCriteriaSql">

    from ${prefix}ACT_HI_VARINST RES

    <if test="authCheck.shouldPerformAuthorizatioCheck &amp;&amp; !authCheck.revokeAuthorizationCheckEnabled &amp;&amp; authCheck.authUserId != null">
        <include refid="org.camunda.bpm.engine.impl.persistence.entity.AuthorizationEntity.authCheckJoinWithoutOnClause"/>
        AUTH ON (AUTH.RESOURCE_ID_ in (RES.PROC_DEF_KEY_, '*'))
    </if>

    <if test="caseActivityIds != null &amp;&amp; caseActivityIds.length > 0">
      INNER JOIN ${prefix}ACT_HI_CASEACTINST HCAI
      ON RES.ACT_INST_ID_ = HCAI.ID_
    </if>

    <where>
      <if test="variableId != null">
        RES.ID_ = #{variableId}
      </if>
      <if test="processInstanceId != null">
        and RES.PROC_INST_ID_ = #{processInstanceId}
      </if>
      <if test="caseInstanceId != null">
        and RES.CASE_INST_ID_ = #{caseInstanceId}
      </if>
      <if test="processDefinitionId != null">
        and RES.PROC_DEF_ID_ = #{processDefinitionId}
      </if>
      <if test="processDefinitionKey !=null">
        and RES.PROC_DEF_KEY_ = #{processDefinitionKey}
      </if>
      <if test="variableName != null">
      and
        <choose>
          <when test="variableNamesIgnoreCase">
            UPPER(RES.NAME_) = UPPER(#{variableName})
          </when>
          <otherwise>
            RES.NAME_ = #{variableName}
          </otherwise>
        </choose>
        ${collationForCaseSensitivity}
      </if>
      <if test="variableNameLike != null">
        and
        <choose>
          <when test="variableNamesIgnoreCase">
            UPPER(RES.NAME_) like UPPER(#{variableNameLike})
          </when>
          <otherwise>
            RES.NAME_ like #{variableNameLike}
          </otherwise>
          </choose>
          ESCAPE ${escapeChar}
          ${collationForCaseSensitivity}
      </if>
      <if test="includeDeleted == false">
        and (RES.STATE_ != 'DELETED' or RES.STATE_ is null)
      </if>

      <!-- processInstanceIds -->
      <if test="processInstanceIds != null &amp;&amp; processInstanceIds.length > 0">
        and RES.PROC_INST_ID_ in
        <foreach item="item" index="index" collection="processInstanceIds"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <!-- taskIds -->
      <if test="taskIds != null &amp;&amp; taskIds.length > 0">
        and RES.TASK_ID_ in
        <foreach item="item" index="index" collection="taskIds"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <!-- variableTypes -->
      <if test="variableTypes != null &amp;&amp; variableTypes.length > 0">
        and lower(RES.VAR_TYPE_) in
        <foreach item="item" index="index" collection="variableTypes"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <!-- executionIds -->
      <if test="executionIds != null &amp;&amp; executionIds.length > 0">
        and RES.EXECUTION_ID_ in
        <foreach item="item" index="index" collection="executionIds"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <!-- caseExecutionIds -->
      <if test="caseExecutionIds != null &amp;&amp; caseExecutionIds.length > 0">
        and RES.CASE_EXECUTION_ID_ in
        <foreach item="item" index="index" collection="caseExecutionIds"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <!-- caseActivityIds -->
      <if test="caseActivityIds != null &amp;&amp; caseActivityIds.length > 0">
        and HCAI.CASE_ACT_ID_ in
        <foreach item="caseActivityId" index="index" collection="caseActivityIds"
                 open="(" separator="," close=")">
          #{caseActivityId}
        </foreach>
      </if>

      <!-- activityInstanceIds -->
      <if test="activityInstanceIds != null &amp;&amp; activityInstanceIds.length > 0">
        and RES.ACT_INST_ID_ in
        <foreach item="item" index="index" collection="activityInstanceIds"
                 open="(" separator="," close=")">
          #{item}
        </foreach>
      </if>

      <if test="isTenantIdSet">
        <if test="tenantIds != null &amp;&amp; tenantIds.length > 0">
          and RES.TENANT_ID_ in
          <foreach item="tenantId" index="index" collection="tenantIds"
                   open="(" separator="," close=")">
            #{tenantId}
          </foreach>
        </if>
        <if test="tenantIds == null">
          and RES.TENANT_ID_ is null
        </if>
      </if>

      <!-- PLEASE NOTE: If you change anything have a look into the Execution, the same query object is used there! -->
      <if test="queryVariableValue != null" >
        <bind name="varTypeField" value="'VAR_TYPE_'"/>
        <bind name="varPrefix" value="'RES.'"/>
        <if test="queryVariableValue.valueConditions != null">
          and
          <include refid="org.camunda.bpm.engine.impl.persistence.entity.Commons.variableValueConditions"/>
        </if>
      </if>

      <if test="authCheck.shouldPerformAuthorizatioCheck &amp;&amp; authCheck.authUserId != null">
        and (
        (RES.EXECUTION_ID_ is not null
        <include refid="org.camunda.bpm.engine.impl.persistence.entity.AuthorizationEntity.queryAuthorizationCheck"/>
        ) or RES.EXECUTION_ID_ is null
        )
      </if>

      <include refid="org.camunda.bpm.engine.impl.persistence.entity.TenantEntity.queryTenantCheck" />

    </where>
  </sql>
```

你们认为它具备可维护行吗？具备可调试性吗？简洁透明吗？它操作的可是你企业核心命脉：数据

如果你使用过mybatis足够长的时间，你总结下你遇到的生产事故，反思一下，是否是mybatis的问题？2011年，淘宝发生了一次p1故障，就是这种xml配置的sql，在生产环境不停的物理删除数据。


## 我的核心观点

xml是一个配置语言，不是编程语言，mybatis是一个sql模板引擎，模板引擎可以用来渲染页面，做工具，但就是不适合操纵数据库，操纵数据的过程太可怕，得足够敬畏。
所以我们对于数据核心逻辑，一定要借助于调试性和可视性都很强的逻辑语言来控制, spring最早都是用xml，现在演化为了配置bean，声明式代码，注意不是声明式配置文件
maven,ant这些用xml来控制逻辑的组件都在慢慢的被代码式，脚本式的gradle的替代。


如果你的公司必须要使用mybatis，可以，那么掌握好分寸，阉割式使用，绝对不要写出上面这种代码，并配合好强大的单元测试，不然你一定会在生产出故障


网络有部分声音和我是相似的，但是每个人都有自己的风格，你可以继续阅读，总而言之，你需要独立思考，关注我后面的文章，我回批判Spring的@Transactional

[为什么我劝你放弃mybatis](https://zhuanlan.zhihu.com/p/45044649)
[为什么国内流行mybatis，国外反而多用hibernate？](https://www.zhihu.com/question/309662829)