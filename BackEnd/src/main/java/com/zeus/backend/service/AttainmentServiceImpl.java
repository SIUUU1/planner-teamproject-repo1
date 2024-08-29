package com.zeus.backend.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Attainment;
import com.zeus.backend.mapper.AttainmentMapper;

@Service
public class AttainmentServiceImpl implements AttainmentService {
    @Autowired
    private AttainmentMapper attainmentMapper;

    @Override
    public List<Attainment> getAllAttainments() {
        return attainmentMapper.getAllAttainments();
    }

    @Override
    public Attainment getAttainmentById(Long no) {
        return attainmentMapper.getAttainmentByIdNo(no);
    }

    @Override
    public Attainment createAttainment(Attainment attainment) {
    	if(attainment.getGroup_id()==null) {
    		attainmentMapper.createAttainment(attainment);
    	}else {
    		attainmentMapper.createGroupAttainment(attainment);
    	}
        return attainment;
    }

    @Override
    public Attainment updateAttainment(Attainment attainment) {
        attainmentMapper.updateAttainment(attainment);
        return attainment;
    }

    @Override
    public void deleteAttainment(Long id) {
        attainmentMapper.deleteAttainment(id);
    }
    
    @Override
    public List<Attainment> getAttainmentsByUserIdAndRegDate(String user_id, Date reg_date) {
        return attainmentMapper.getAttainmentsByUserIdAndRegDate(user_id, reg_date);
    }

	@Override
	public List<Attainment> getAttainmentsByUserIdAndDate(String user_id, String attainment_duration, LocalDate select_date) {
		System.out.println("attainment_duration: "+attainment_duration);
		if(attainment_duration.equals("short_term")) {
			return attainmentMapper.getShortTermAttainments(user_id, select_date);
		}
		if(attainment_duration.equals("long_term")) {
			return attainmentMapper.getLongTermAttainments(user_id, select_date);
		}
		return null;
	}

	@Override
	public List<Attainment> getAttainmentsByOtherGroupIdAndDate(Long group_id, String attainment_duration,
			LocalDate select_date) {
		System.out.println("attainment_duration: "+attainment_duration);
		if(attainment_duration.equals("short_term")) {
			return attainmentMapper.getShortTermAttainmentsByGroupId(group_id, select_date);
		}
		if(attainment_duration.equals("long_term")) {
			return attainmentMapper.getLongTermAttainmentsByGroupId(group_id, select_date);
		}
		return null;
	}
	
	 @Override
	    public Map<String, String> getMonthlyLongTermAttainmentRate() {
	        return attainmentMapper.getMonthlyLongTermAttainmentRate();
	    }
	 
	 @Override
	    public Map<String, String> getMonthlyShortTermAttainmentRate() {
	        return attainmentMapper.getMonthlyShortTermAttainmentRate();
	    }
    
}