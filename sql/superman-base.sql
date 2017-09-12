DROP TABLE IF EXISTS SYS_APP;

DROP TABLE IF EXISTS SYS_APP_VERSION;

DROP TABLE IF EXISTS SYS_LOG_AUDIT;

DROP TABLE IF EXISTS SYS_PARAM;

DROP TABLE IF EXISTS SYS_PRIV;

DROP TABLE IF EXISTS SYS_ROLE;

DROP TABLE IF EXISTS SYS_ROLE_PRIV;

DROP TABLE IF EXISTS SYS_USER;

DROP TABLE IF EXISTS SYS_USER_ROLE;

DROP TABLE IF EXISTS SYS_USER_SESSION;

/*==============================================================*/
/* Table: SYS_APP                                               */
/*==============================================================*/
CREATE TABLE SYS_APP
(
   APP_ID               BIGINT(9) NOT NULL AUTO_INCREMENT,
   APP_NAME             VARCHAR(255) NOT NULL,
   APP_TYPE             INT(1) NOT NULL COMMENT '1:ANDROID
            2:IOS
            3:WINPHONE',
   DESCRIPTION          VARCHAR(1000) NOT NULL,
   STATE                CHAR(1) NOT NULL DEFAULT 'A' COMMENT 'A:在用
            X:已废弃',
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   UPDATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (APP_ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_APP_VERSION                                       */
/*==============================================================*/
CREATE TABLE SYS_APP_VERSION
(
   VERSION_ID           BIGINT(9) NOT NULL AUTO_INCREMENT,
   APP_ID               BIGINT(9) NOT NULL,
   VERSION_NUMBER       VARCHAR(255) NOT NULL,
   DOWNLOAD_PATH        VARCHAR(1000),
   VERSION_DESC         VARCHAR(1000) NOT NULL,
   STATE                CHAR(1) NOT NULL DEFAULT 'A' COMMENT 'A:生效
            X:失效',
   FORCE_UPDATE         TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0：否
            1：是',
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   UPDATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (VERSION_ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_LOG_AUDIT                                         */
/*==============================================================*/
CREATE TABLE SYS_LOG_AUDIT
(
   ID                   BIGINT(9) NOT NULL AUTO_INCREMENT,
   LOG_TYPE             VARCHAR(255) NOT NULL,
   USER_ID              BIGINT(9),
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   DESCRIPTION          VARCHAR(1000) NOT NULL,
   PRIMARY KEY (ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARACTER SET=UTF8;

/*==============================================================*/
/* Table: SYS_PARAM                                             */
/*==============================================================*/

CREATE TABLE SYS_PARAM
(
   ID                   BIGINT(9) NOT NULL AUTO_INCREMENT,
   PARAM_CODE           VARCHAR(255) NOT NULL,
   PARAM_VALUE          VARCHAR(4000) NOT NULL,
   PARAM_TEXT           VARCHAR(255),
   PARAM_MORE_VALUE     VARCHAR(4000) COMMENT 'KV对用冒号隔开;如key1=value1;key2=value2;',
   STATE                CHAR(1) NOT NULL COMMENT 'A:在用
            X:已废弃',
   DESCRIPTION          VARCHAR(4000) NOT NULL,
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   UPDATE_DATE          DATETIME,
   PRIMARY KEY (ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_PRIV                                              */
/*==============================================================*/
CREATE TABLE SYS_PRIV
(
   PRIV_ID              BIGINT(9) NOT NULL AUTO_INCREMENT,
   PARENT_PRIV_ID       BIGINT(9) NOT NULL DEFAULT 0,
   PRIV_CODE            VARCHAR(255) NOT NULL,
   PRIV_NAME            VARCHAR(60) NOT NULL,
   TYPE                 INT(9) NOT NULL COMMENT '0：目录
            1：菜单
            2：数据',
   URL                  VARCHAR(255),
   PATH                 VARCHAR(255),
   DESCRIPTION          VARCHAR(1000) NOT NULL,
   STATE                CHAR(1) NOT NULL DEFAULT 'A',
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   UPDATE_TIME          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (PRIV_ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_ROLE                                              */
/*==============================================================*/
CREATE TABLE SYS_ROLE
(
   ROLE_ID              BIGINT(9) NOT NULL AUTO_INCREMENT,
   ROLE_CODE            VARCHAR(60) NOT NULL,
   ROLE_NAME            VARCHAR(60) NOT NULL,
   STATE                CHAR(1) NOT NULL DEFAULT 'A',
   CREATE_DATE          DATETIME DEFAULT CURRENT_TIMESTAMP,
   UPDATE_DATE          DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   DESCRIPTION          VARCHAR(255),
   PRIMARY KEY (ROLE_ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_ROLE_PRIV                                         */
/*==============================================================*/
CREATE TABLE SYS_ROLE_PRIV
(
   ROLE_ID              BIGINT(9) NOT NULL,
   PRIV_ID              BIGINT(9) NOT NULL,
   STATE                CHAR(1) NOT NULL DEFAULT 'A',
   CREATE_DATE          DATETIME DEFAULT CURRENT_TIMESTAMP,
   UPDATE_DATE          DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (ROLE_ID, PRIV_ID)
);

/*==============================================================*/
/* Table: SYS_USER                                              */
/*==============================================================*/
CREATE TABLE SYS_USER
(
   USER_ID              BIGINT(9) NOT NULL AUTO_INCREMENT,
   USER_NAME            VARCHAR(60) NOT NULL,
   USER_CODE            VARCHAR(60) NOT NULL COMMENT '登陆账户',
   PWD                  VARCHAR(60) NOT NULL,
   MOBILE               VARCHAR(255),
   MEMO                 VARCHAR(255),
   USER_EFF_DATE        DATETIME NOT NULL,
   USER_EXP_DATE        DATETIME COMMENT '空表示永不实效',
   CREATED_DATE         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   STATE                CHAR(1) NOT NULL COMMENT 'A-在用，X-失效',
   STATE_DATE           DATETIME NOT NULL,
   IS_LOCKED            CHAR(1) NOT NULL DEFAULT 'N' COMMENT '是否锁定，''Y''-锁定，''N''-没有锁定，null表示''N''',
   PWD_EXP_DATE         DATETIME COMMENT '密码过期时间，空表示永不过期',
   FORCE_LOGIN          CHAR(1) DEFAULT 'Y' COMMENT 'Y允许强制登录，N不允许。默认N',
   LOGIN_FAIL           INT(6) NOT NULL COMMENT '登录失败次数，空表示0',
   UNLOCK_DATE          DATETIME,
   USER_SRC             BIGINT(9) NOT NULL DEFAULT 0,
   PRIMARY KEY (USER_ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

/*==============================================================*/
/* Table: SYS_USER_ROLE                                         */
/*==============================================================*/
CREATE TABLE SYS_USER_ROLE
(
   USER_ID              BIGINT(9) NOT NULL,
   ROLE_ID              BIGINT(9) NOT NULL,
   STATE                CHAR(1) DEFAULT 'A' COMMENT 'X:禁用
            A:使用',
   CREATE_DATE          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   STATE_DATE           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (ROLE_ID, USER_ID)
);

/*==============================================================*/
/* Table: SYS_USER_SESSION                                      */
/*==============================================================*/
CREATE TABLE SYS_USER_SESSION
(
   ID                   BIGINT(9) NOT NULL AUTO_INCREMENT,
   TOKEN                VARCHAR(255) NOT NULL,
   USER_ID              BIGINT(9) NOT NULL,
   STATE                CHAR(1) NOT NULL COMMENT 'A-可用; X-不可用',
   CREATE_DATE          DATETIME NOT NULL,
   LAST_UPDATE_DATE     DATETIME NOT NULL,
   UA                   VARCHAR(255) NOT NULL,
   PRIMARY KEY (ID)
)
AUTO_INCREMENT=1001 DEFAULT CHARSET=UTF8;

--
--
DROP TABLE IF EXISTS SYS_FILE_BUCKET;

/*==============================================================*/
/* Table: SYS_FILE_BUCKET                                       */
/*==============================================================*/
CREATE TABLE SYS_FILE_BUCKET
(
    BUCKET_ID   BIGINT(9)    NOT NULL AUTO_INCREMENT,
    BUCKET_NAME VARCHAR(500) NOT NULL,
    BUCKET_CODE VARCHAR(100) NOT NULL,
    HOST_NAME   VARCHAR(500) NOT NULL,
    IS_PUBLIC   TINYINT(1)            DEFAULT 1,
    CREATE_DATE DATETIME              DEFAULT CURRENT_TIMESTAMP,
    UPDATE_DATE DATETIME              DEFAULT CURRENT_TIMESTAMP,
    DESCRIPTION VARCHAR(1000),
    PRIMARY KEY (BUCKET_ID)
)
    AUTO_INCREMENT = 1001
    DEFAULT CHARSET = UTF8;

-- SYS_FILE　domain

DROP TABLE IF EXISTS SYS_FILE;

/*==============================================================*/
/* Table: SYS_FILE                                              */
/*==============================================================*/
CREATE TABLE SYS_FILE
(
    ID               BIGINT(9)     NOT NULL AUTO_INCREMENT,
    BUCKET_ID        BIGINT(9),
    FILE_NAME        VARCHAR(500)  NOT NULL,
    ORIGIN_FILE_NAME VARCHAR(500),
    HASH             VARCHAR(500),
    FILE_URL         VARCHAR(1000) NOT NULL,
    MIME_TYPE        VARCHAR(20)   NOT NULL
    COMMENT 'img,zip,txt 等等',
    FILE_SIZE        VARCHAR(1000),
    STATE            INT(1)        NOT NULL DEFAULT 1
    COMMENT '1:在用; 0:废弃;可扩展其他状态',
    CREATE_DATE      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATE_DATE      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DESCRIPTION      VARCHAR(1000),
    PRIMARY KEY (ID)
)
    AUTO_INCREMENT = 1001
    DEFAULT CHARSET = UTF8;

-- 1.2.0
ALTER TABLE SYS_APP
    ADD APP_SECRET VARCHAR(128);
ALTER TABLE SYS_APP
    ADD APP_CODE VARCHAR(100);
