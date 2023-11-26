package firealarm;



import jakarta.persistence.*;
@Entity
public class AlarmMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isFireDepartmentCalled;
    private int apartment;
    private String comment;
    private String sentAt;

    public AlarmMessage() {}

    public AlarmMessage(boolean isFireDepartmentCalled, int apartment, String comment, String sentAt)
    {
        this.isFireDepartmentCalled = isFireDepartmentCalled;
        this.apartment = apartment;
        this.comment = comment;
        this.sentAt =  sentAt;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public boolean isFireDepartmentCalled()
    {
        return isFireDepartmentCalled;
    }

    public void setFireDepartmentCalled(boolean fireDepartmentCalled)
    {
        isFireDepartmentCalled = fireDepartmentCalled;
    }

    public int getApartment()
    {
        return apartment;
    }

    public void setApartment(int apartment)
    {
        this.apartment = apartment;
    }

    public String getComment()
    {
        return comment;
    }

    public void setComment(String comment)
    {
        this.comment = comment;
    }

    public String getSentAt()
    {
        return sentAt;
    }

    public void setSentAt(String sentAt)
    {
        this.sentAt = sentAt;
    }
}
