package boardClone.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import boardClone.dto.BoardDto;
import boardClone.dto.BoardFileDto;

@Mapper
public interface BoardMapper {

	public List<BoardDto> selectBoardList() throws Exception;

	public void insertBoard(BoardDto board);

	public BoardDto selectBoardDetail(int boardIdx);

	public void updateHitCount(int boardIdx);

	public void updateBoard(BoardDto boardDto);

	public void deleteBoard(int boardIdx);

	public void insertBoardFileList(List<BoardFileDto> fileInfoList);

	public List<BoardFileDto> selectBoardFileList(int boardIdx);
	
	public BoardFileDto selectBoardFileInfo(@Param("idx") int idx, @Param("boardIdx") int boardIdx) throws Exception;
}
