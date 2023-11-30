package firealarm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class FireAlarmController {
    private final AlarmMessageDao alarmMessageDao;

    @Value("${alarm.message.timezone}")
    private String timezone;

    @Autowired
    public FireAlarmController(AlarmMessageDao alarmMessageDao)
    {
        this.alarmMessageDao = alarmMessageDao;
    }

    @GetMapping("/messages")
    @ResponseStatus(HttpStatus.OK)
    public List<AlarmMessage> getAlarmMessages()
    {
        return alarmMessageDao.findAllByOrderByIdDesc();
    }

    @RequestMapping(value = "/submit", method = POST, consumes = APPLICATION_JSON_VALUE, produces =
        APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void postAlarmMessage(@RequestBody AlarmMessageDTO request)
    {
        //TODO filter out profanity
        String sentAt = ZonedDateTime.now(ZoneId.of(this.timezone)).
            format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
        alarmMessageDao.save(
            new AlarmMessage(request.isFireDepartmentCalled(), request.apartment(), request.comment(), sentAt)
        );
        //TODO call whatsapp service
    }
}
