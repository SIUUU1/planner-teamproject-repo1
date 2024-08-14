package com.zeus.backend.mapper;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.Attainment;

@Mapper
public interface AttainmentMapper {
	List<Attainment> getAllAttainments();

	Attainment getAttainmentByIdNo(Long no);

	void createAttainment(Attainment attainment);

	void updateAttainment(Attainment attainment);

	void deleteAttainment(Long id);

	List<Attainment> getAttainmentsByUserIdAndRegDate(String user_id, Date reg_date);

	List<Attainment> getShortTermAttainments(String user_id, LocalDate select_date);

	List<Attainment> getLongTermAttainments(String user_id, LocalDate select_date);
}