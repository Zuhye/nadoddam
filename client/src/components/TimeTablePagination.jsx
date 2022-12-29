import React, { useEffect, useState } from 'react';
import {PageWrapper, PageBtn} from '../styles/Styled'


const Pagination = ( {pageCount, pageGroup, setPageGroup, timeTable, perpage, page, setPage, first, setFirst, last, setLast , lastId, setLastId}) => {
    const [btnActive, setBtnActive] = useState('');
    const current = Math.ceil(timeTable.length/perpage) + pageCount * pageGroup; 

    const pageNum = () =>{
        let pageList = [];
        
        console.log(first,last);
        for (let i = first; i <= last; i++) {
            pageList.push(
                <PageBtn
                    value={i}
                    key={i + 1}
                    className={i == btnActive ? 'active' : ''}
                    onClick={(e) => hadlePageBtn(e,i)}
                >
                {i}
                </PageBtn>
            );
        }
        return pageList;
    };
    
    const handleNext = () => {
        setPage(page + 1)
    }

    const hadlePageBtn = (e,i) => {
        setPage(i);
        setBtnActive(e.target.value);
    };

    const handlePrevPage = () =>{
        setFirst((pageGroup+1)*pageCount - (last-1));
        setPageGroup(pageGroup - 1);
    }

    const handleNextPage = () =>{
        setFirst(last + 1);  
        setPageGroup(pageGroup + 1);
        if( lastId.filter( id => id >= timeTable[timeTable.length -1].id).length == 0 ){
            setLastId([...lastId, timeTable[timeTable.length -1].id]);
        }
    }

    useEffect(() =>{
        setLast(pageGroup *pageCount);
    },[]); 

    useEffect(()=>{
        // console.log("last:",last);
        if (current < last){
            setLast(current);
        }
    },[last])

    useEffect(()=>{
        // console.log("last:",last);
        setLast((pageGroup + 1)*pageCount); 
    },[first,pageGroup]);

    useEffect(()=>{
        setPage(pageGroup * pageCount + 1);
    },[pageGroup]);
    
    useEffect(()=>{ 
        setBtnActive(page);
    },[page])



	return (
		<>
			<PageWrapper>
                <PageBtn onClick={handlePrevPage}  disabled={page < pageCount+1}>
					{'<<'}
				</PageBtn>
				<PageBtn onClick={() => setPage(page - 1)} disabled={page===first}>
					&lt; 
				</PageBtn>
				{
                    pageNum()
				}
				<PageBtn onClick={handleNext} disabled={page === last}>
					&gt;
				</PageBtn>
                <PageBtn onClick={handleNextPage} disabled={last < (pageGroup+1) * pageCount}>
					{'>>'}
				</PageBtn>
			</PageWrapper>
		</>
	);
}

export default Pagination;
