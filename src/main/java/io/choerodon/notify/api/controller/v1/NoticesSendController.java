package io.choerodon.notify.api.controller.v1;

import io.choerodon.core.exception.FeignException;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.notify.api.dto.NoticeSendDTO;
import io.choerodon.notify.api.service.NoticesSendService;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("v1/notices")
@Api("邮件，短信，站内信发送接口")
public class NoticesSendController {

    private NoticesSendService noticesSendService;

    public NoticesSendController(NoticesSendService noticesSendService) {
        this.noticesSendService = noticesSendService;
    }

    @PostMapping
    @ApiOperation(value = "发送邮件，站内信，短信")
    @Permission(level = ResourceLevel.SITE)
    public void postNotice(@RequestBody NoticeSendDTO dto) {
        if (StringUtils.isEmpty(dto.getCode())) {
            throw new FeignException("error.postNotify.codeEmpty");
        }
        if (dto.getTargetUsers() == null || dto.getTargetUsers().isEmpty()) {
            return;
        }
        if (dto.getParams() == null) {
            dto.setParams(new HashMap<>(0));
        }
        noticesSendService.sendNotice(dto);
    }
}
