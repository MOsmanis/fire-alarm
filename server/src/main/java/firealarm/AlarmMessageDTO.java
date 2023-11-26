package firealarm;

public record AlarmMessageDTO(boolean isFireDepartmentCalled, int apartment, String comment, String sentAt) {
}
