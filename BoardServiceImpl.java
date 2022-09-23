package boardClone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import boardClone.dto.BoardDto;
import boardClone.dto.BoardFileDto;
import boardClone.mapper.BoardMapper;
import lombok.extern.slf4j.Slf4j;
import boardClone.common.FileUtils;

@Slf4j
@Service
@Transactional
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private FileUtils fileUtils;
	

	@Override
	public void insertBoard(BoardDto board, MultipartHttpServletRequest request) throws Exception {
		boardMapper.insertBoard(board);
		
		// 첨부 파일을 저장하고 첨부 파일 정보를 반환
		List<BoardFileDto> fileInfoList = fileUtils.parseFileInfo(board.getBoardIdx(), request);
		// 첨부 파일 정보를 저장
		if (!CollectionUtils.isEmpty(fileInfoList)) {
			boardMapper.insertBoardFileList(fileInfoList);
		}
	}


	@Override
	public BoardFileDto selectBoardFileInfo(int idx, int boardIdx) throws Exception {
		return boardMapper.selectBoardFileInfo(idx, boardIdx);
	}

}
